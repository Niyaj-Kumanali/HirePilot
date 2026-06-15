package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.EmailGenerateRequest;
import com.hirepilot.backend.dto.EmailGenerateResponse;
import com.hirepilot.backend.dto.EmailHistoryItem;
import com.hirepilot.backend.dto.EmailSendRequest;
import com.hirepilot.backend.dto.EmailSendResponse;
import com.hirepilot.backend.entity.SentEmailEntity;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.SentEmailRepository;
import com.hirepilot.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    private final GeminiService geminiService;
    private final UserRepository userRepository;
    private final SentEmailRepository sentEmailRepository;
    private final JavaMailSender mailSender;
    private final String fromEmail;

    public EmailService(
            GeminiService geminiService,
            UserRepository userRepository,
            SentEmailRepository sentEmailRepository,
            JavaMailSender mailSender,
            @Value("${spring.mail.username}") String fromEmail) {
        this.geminiService = geminiService;
        this.userRepository = userRepository;
        this.sentEmailRepository = sentEmailRepository;
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public EmailGenerateResponse generateEmail(EmailGenerateRequest req, String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String userName = user.getFirstName() != null
                ? user.getFirstName() + " " + (user.getLastName() != null ? user.getLastName() : "")
                : user.getEmail();

        String skills = req.userSkills() != null && !req.userSkills().isBlank()
                ? req.userSkills()
                : (user.getSkillsJson() != null ? user.getSkillsJson() : "Not specified");

        String experience = req.userExperience() != null && !req.userExperience().isBlank()
                ? req.userExperience()
                : (user.getBio() != null ? user.getBio() : "Not specified");

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
            """.formatted(
                userName, skills, experience,
                req.jobTitle(), req.jobCompany(), req.hiringManagerName()
            );

        String aiResponse = geminiService.generateContent(prompt);

        String subject = "Application for " + req.jobTitle() + " position";
        String body = aiResponse;

        if (aiResponse.startsWith("SUBJECT:")) {
            int subjectEnd = aiResponse.indexOf("\n");
            if (subjectEnd > 0) {
                subject = aiResponse.substring(8, subjectEnd).trim();
                body = aiResponse.substring(subjectEnd + 1).trim();
            }
        }

        return new EmailGenerateResponse(subject, body);
    }

    public EmailSendResponse sendEmail(EmailSendRequest req, String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(req.toEmail());
        message.setSubject(req.subject());
        message.setText(req.body());

        String status;
        String errorMsg = null;
        try {
            mailSender.send(message);
            status = "SENT";
        } catch (Exception e) {
            status = "FAILED";
            errorMsg = e.getMessage();
        }

        SentEmailEntity emailEntity = new SentEmailEntity();
        emailEntity.setUser(user);
        emailEntity.setToEmail(req.toEmail());
        emailEntity.setToName(req.toName());
        emailEntity.setSubject(req.subject());
        emailEntity.setBody(req.body());
        emailEntity.setJobTitle(req.jobTitle());
        emailEntity.setJobCompany(req.jobCompany());
        emailEntity.setJobLocation(req.jobLocation());
        emailEntity.setStatus(status);
        sentEmailRepository.save(emailEntity);

        String messageText = "SENT".equals(status)
                ? "Email sent successfully to " + req.toEmail()
                : "Failed to send email: " + errorMsg;

        return new EmailSendResponse(emailEntity.getId(), status, messageText);
    }

    public List<EmailHistoryItem> getEmailHistory(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<SentEmailEntity> emails = sentEmailRepository.findByUserIdOrderBySentAtDesc(user.getId());
        return emails.stream()
                .map(e -> new EmailHistoryItem(
                        e.getId(), e.getToEmail(), e.getToName(),
                        e.getSubject(), e.getBody(),
                        e.getJobTitle(), e.getJobCompany(),
                        e.getStatus(), e.getSentAt()))
                .collect(Collectors.toList());
    }
}
