package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.EmailGenerateRequest;
import com.hirepilot.backend.dto.EmailGenerateResponse;
import com.hirepilot.backend.dto.EmailSendRequest;
import com.hirepilot.backend.dto.EmailSendResponse;
import com.hirepilot.backend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    private String getCurrentEmail() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        return null;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateEmail(@RequestBody EmailGenerateRequest req) {
        String email = getCurrentEmail();
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            EmailGenerateResponse response = emailService.generateEmail(req, email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to generate email: " + e.getMessage()));
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailSendRequest req) {
        String email = getCurrentEmail();
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            EmailSendResponse response = emailService.sendEmail(req, email);
            if ("FAILED".equals(response.status())) {
                return ResponseEntity.internalServerError().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getEmailHistory() {
        String email = getCurrentEmail();
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(emailService.getEmailHistory(email));
    }
}
