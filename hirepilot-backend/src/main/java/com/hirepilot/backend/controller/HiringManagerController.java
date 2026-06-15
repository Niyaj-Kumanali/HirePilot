package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.*;
import com.hirepilot.backend.entity.HiringManagerEntity;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.HiringManagerRepository;
import com.hirepilot.backend.repository.UserRepository;
import com.hirepilot.backend.service.ExcelService;
import com.hirepilot.backend.service.HiringManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hiring-managers")
public class HiringManagerController {

    private final ExcelService excelService;
    private final HiringManagerService hiringManagerService;
    private final UserRepository userRepository;
    private final HiringManagerRepository managerRepository;

    public HiringManagerController(
            ExcelService excelService,
            HiringManagerService hiringManagerService,
            UserRepository userRepository,
            HiringManagerRepository managerRepository) {
        this.excelService = excelService;
        this.hiringManagerService = hiringManagerService;
        this.userRepository = userRepository;
        this.managerRepository = managerRepository;
    }

    private String getCurrentEmail() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName();
        }
        return null;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadExcel(@RequestParam("file") MultipartFile file) {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        UserEntity user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "User not found"));

        try {
            var parsed = excelService.parseAndSave(file, email, user);
            return ResponseEntity.ok(new UploadResponse(
                parsed.rows().size(), parsed.duplicateCount(), parsed.rows().size(), parsed.rows(),
                "Uploaded " + parsed.rows().size() + " new contacts (" + parsed.duplicateCount() + " duplicates skipped)"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to parse Excel: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(hiringManagerService.getAll(email));
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateEmail(@RequestBody GenerateEmailRequest req) {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(hiringManagerService.generateEmail(req.managerId(), email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/generate-all")
    public ResponseEntity<?> generateAll() {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(hiringManagerService.generateAll(email));
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmails(@RequestBody SendEmailRequest req) {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(hiringManagerService.sendEmails(req.managerIds(), email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/send-all")
    public ResponseEntity<?> sendAll() {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        UserEntity user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.status(401).build();

        List<Long> allIds = new ArrayList<>();
        for (HiringManagerEntity m : managerRepository.findByUserIdAndStatus(user.getId(), "GENERATED")) {
            allIds.add(m.getId());
        }
        for (HiringManagerEntity m : managerRepository.findByUserIdAndStatus(user.getId(), "PENDING")) {
            allIds.add(m.getId());
        }
        return ResponseEntity.ok(hiringManagerService.sendEmails(allIds, email));
    }

    @PostMapping("/confirm-resend")
    public ResponseEntity<?> confirmResend(@RequestBody ResendConfirmRequest req) {
        String email = getCurrentEmail();
        if (email == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        hiringManagerService.confirmResend(req.managerId(), req.confirmed(), email);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
