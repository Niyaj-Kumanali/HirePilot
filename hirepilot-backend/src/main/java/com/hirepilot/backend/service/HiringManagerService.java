package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.*;
import com.hirepilot.backend.entity.HiringManagerEntity;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.HiringManagerRepository;
import com.hirepilot.backend.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HiringManagerService {

    private final HiringManagerRepository managerRepo;
    private final UserRepository userRepo;
    private final GeminiService geminiService;
    private final JavaMailSender mailSender;
    private final String fromEmail;

    public HiringManagerService(
            HiringManagerRepository managerRepo,
            UserRepository userRepo,
            GeminiService geminiService,
            JavaMailSender mailSender,
            @Value("${spring.mail.username}") String fromEmail) {
        this.managerRepo = managerRepo;
        this.userRepo = userRepo;
        this.geminiService = geminiService;
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public List<HiringManagerRow> getAll(String userEmail) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return managerRepo.findByUserIdOrderByIdDesc(user.getId())
                .stream().map(this::toRow).toList();
    }

    public HiringManagerRow generateEmail(Long managerId, String userEmail) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        HiringManagerEntity manager = managerRepo.findByIdAndUserId(managerId, user.getId())
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        String userName = user.getFirstName() != null
                ? user.getFirstName() + " " + (user.getLastName() != null ? user.getLastName() : "")
                : user.getEmail();
        String skills = user.getSkillsJson() != null ? user.getSkillsJson() : "Relevant skills";
        String experience = user.getParsedResumeJson() != null ? user.getParsedResumeJson() : "Professional experience";

        String prompt = """
            You are a professional career coach. Write a personalized cold email for a job application.

            Sender name: %s
            Sender skills: %s
            Sender experience: %s

            Job title: %s
            Company: %s
            Hiring manager name: %s

            Write a professional, concise cold email (3-4 paragraphs) that:
            1. Has a clear subject line prefixed with "SUBJECT:"
            2. Opens with a confident introduction
            3. Highlights 2-3 relevant skills/achievements
            4. Shows knowledge of the company
            5. Ends with a clear call to action

            Return exactly in this format:
            SUBJECT: <subject line>
            <email body>
            """.formatted(userName, skills, experience, manager.getJobTitle(), manager.getCompany(), manager.getName());

        String aiResponse = geminiService.generateContent(prompt);

        String subject = "Application for " + manager.getJobTitle() + " position";
        String body = aiResponse;
        if (aiResponse.startsWith("SUBJECT:")) {
            int end = aiResponse.indexOf("\n");
            if (end > 0) {
                subject = aiResponse.substring(8, end).trim();
                body = aiResponse.substring(end + 1).trim();
            }
        }

        manager.setGeneratedSubject(subject);
        manager.setGeneratedBody(body);
        manager.setStatus("GENERATED");
        managerRepo.save(manager);

        return toRow(manager);
    }

    public BatchActionResponse generateAll(String userEmail) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<HiringManagerEntity> pending = managerRepo.findByUserIdAndStatus(user.getId(), "PENDING");
        int success = 0;
        for (HiringManagerEntity m : pending) {
            try {
                generateEmail(m.getId(), userEmail);
                success++;
            } catch (Exception ignored) {}
        }
        return new BatchActionResponse(success, pending.size() - success, "Generation complete");
    }

    public BatchActionResponse sendEmails(List<Long> managerIds, String userEmail) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getResumeFilePath() == null || user.getResumeFilePath().isBlank()) {
            throw new RuntimeException("Please upload your resume before sending emails");
        }

        byte[] resumeBytes;
        String resumeFileName;
        try {
            resumeBytes = new URL(user.getResumeFilePath()).openStream().readAllBytes();
            resumeFileName = user.getResumeFilePath().substring(
                    user.getResumeFilePath().lastIndexOf('/') + 1);
        } catch (Exception e) {
            throw new RuntimeException("Failed to download resume: " + e.getMessage());
        }

        int success = 0;
        int fail = 0;
        List<String> errors = new ArrayList<>();

        for (Long id : managerIds) {
            Optional<HiringManagerEntity> opt = managerRepo.findByIdAndUserId(id, user.getId());
            if (opt.isEmpty()) { fail++; continue; }
            HiringManagerEntity m = opt.get();

            if (m.getSendCount() > 1) {
                fail++;
                errors.add("Cannot resend to " + m.getEmail() + " (already resent once)");
                continue;
            }

            if (m.getSendCount() > 0 && !m.isResendConfirmed()) {
                fail++;
                errors.add("Resend not confirmed for " + m.getEmail());
                continue;
            }

            try {
                MimeMessage mimeMsg = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMsg, true, "UTF-8");
                helper.setFrom(fromEmail);
                helper.setTo(m.getEmail());
                helper.setSubject(m.getGeneratedSubject() != null ? m.getGeneratedSubject() : "Application for " + m.getJobTitle());
                helper.setText(m.getGeneratedBody() != null ? m.getGeneratedBody() : "Please find my application attached.");
                helper.addAttachment(resumeFileName, new ByteArrayResource(resumeBytes));

                mailSender.send(mimeMsg);

                m.setStatus("SENT");
                m.setSentAt(LocalDateTime.now());
                m.setSendCount(m.getSendCount() + 1);
                m.setResendConfirmed(false);
                managerRepo.save(m);
                success++;
            } catch (Exception e) {
                m.setStatus("FAILED");
                managerRepo.save(m);
                fail++;
                errors.add(e.getMessage());
            }
        }

        String msg = success + " sent" + (fail > 0 ? ", " + fail + " failed" : "");
        return new BatchActionResponse(success, fail, msg);
    }

    public void confirmResend(Long managerId, boolean confirmed, String userEmail) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        HiringManagerEntity m = managerRepo.findByIdAndUserId(managerId, user.getId())
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        m.setResendConfirmed(confirmed);
        managerRepo.save(m);
    }

    private HiringManagerRow toRow(HiringManagerEntity m) {
        return new HiringManagerRow(
            m.getId(), m.getName(), m.getEmail(), m.getCompany(), m.getJobTitle(),
            m.getJobLocation(), m.getGeneratedSubject(), m.getGeneratedBody(),
            m.getStatus(), m.getSentAt(), m.getSendCount(), m.isResendConfirmed(), false
        );
    }
}
