package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.request.SignInRequest;
import com.hirepilot.backend.dto.request.SignUpRequest;
import com.hirepilot.backend.dto.response.ApiResponse;
import com.hirepilot.backend.dto.response.JwtResponse;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.security.CurrentUser;
import com.hirepilot.backend.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<JwtResponse>> signUp(@Valid @RequestBody SignUpRequest request) {
        log.info("POST /api/auth/signup - email: {}", request.getEmail());
        JwtResponse response = authService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<JwtResponse>> signIn(@Valid @RequestBody SignInRequest request) {
        log.info("POST /api/auth/signin - email: {}", request.getEmail());
        JwtResponse response = authService.signIn(request);
        return ResponseEntity.ok(ApiResponse.success("User signed in successfully", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser(
            @CurrentUser org.springframework.security.core.userdetails.User principal) {
        String email = principal.getUsername();
        log.debug("GET /api/auth/me - email: {}", email);

        UserEntity user = authService.getCurrentUser(email);
        Map<String, Object> userData = Map.of(
                "email", user.getEmail(),
                "firstName", user.getFirstName() != null ? user.getFirstName() : "",
                "lastName", user.getLastName() != null ? user.getLastName() : "",
                "role", user.getRole().name(),
                "headline", user.getHeadline() != null ? user.getHeadline() : "",
                "location", user.getLocation() != null ? user.getLocation() : "",
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "bio", user.getBio() != null ? user.getBio() : "",
                "skillsJson", user.getSkillsJson() != null ? user.getSkillsJson() : "[]",
                "resumeFilePath", user.getResumeFilePath() != null ? user.getResumeFilePath() : ""
        );

        return ResponseEntity.ok(ApiResponse.success("User found", userData));
    }
}
