package com.hirepilot.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class ResumeService {

    private final Cloudinary cloudinary;
    private final UserRepository userRepository;
    private final GeminiService geminiService;

    public ResumeService(Cloudinary cloudinary, UserRepository userRepository, GeminiService geminiService) {
        this.cloudinary = cloudinary;
        this.userRepository = userRepository;
        this.geminiService = geminiService;
    }

    public String parseResume(MultipartFile file, String email) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "auto",
                "folder", "resumes"
        ));
        String fileUrl = (String) uploadResult.get("secure_url");

        String fileContent = new String(file.getBytes(), StandardCharsets.UTF_8);

        String prompt = """
            Extract the following information from this resume and return ONLY valid JSON (no markdown, no code fences):
            {
              "name": "...",
              "email": "...",
              "phone": "...",
              "headline": "...",
              "skills": ["skill1", "skill2", ...],
              "experience": [
                {
                  "company": "...",
                  "role": "...",
                  "duration": "...",
                  "description": "..."
                }
              ],
              "education": [
                {
                  "degree": "...",
                  "institution": "...",
                  "year": "..."
                }
              ],
              "certifications": ["cert1", ...]
            }

            Resume content:
            """ + fileContent;

        String parsedJson = geminiService.generateContent(prompt);

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setParsedResumeJson(parsedJson);
        user.setResumeFilePath(fileUrl);
        userRepository.save(user);

        return parsedJson;
    }

    public String getParsedResume(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getParsedResumeJson();
    }
}
