package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.ResumeUploadResponse;
import com.hirepilot.backend.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    private String getCurrentEmail() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        return "iamnawazahmad777@gmail.com";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        String email = getCurrentEmail();
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }

        try {
            String fileUrl = resumeService.uploadResume(file, email);
            return ResponseEntity.ok(new ResumeUploadResponse(
                    null, file.getOriginalFilename(), fileUrl, "Resume uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to upload resume: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getResume() {
        String email = getCurrentEmail();
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String resumeUrl = resumeService.getResumeUrl(email);
        if (resumeUrl == null) {
            return ResponseEntity.ok(Map.of("message", "No resume uploaded yet"));
        }
        return ResponseEntity.ok(Map.of("fileUrl", resumeUrl));
    }
}
