package com.hirepilot.backend.controller;

import com.hirepilot.backend.config.jwt.JwtUtil;
import com.hirepilot.backend.dto.AuthResponse;
import com.hirepilot.backend.dto.SignInRequest;
import com.hirepilot.backend.dto.SignUpRequest;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "User already exists"));
        }

        UserEntity user = new UserEntity();
        user.setEmail(req.email());
        user.setPasswordHash(BCrypt.hashpw(req.password(), BCrypt.gensalt()));
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        userRepository.save(user);

        String token = jwtUtil.generateToken(req.email());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, req.email(), req.firstName(), req.lastName()));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest req) {
        UserEntity user = userRepository.findByEmail(req.email())
                .orElse(null);

        if (user == null || !BCrypt.checkpw(req.password(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(req.email());
        return ResponseEntity.ok(new AuthResponse(
                token, user.getEmail(), user.getFirstName(), user.getLastName()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            @RequestAttribute(value = "email", required = false) String emailAttr) {
        String email = emailAttr;
        if (email == null) {
            var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                email = auth.getName();
            }
        }
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not authenticated"));
        }
        UserEntity user = userRepository.findByEmail(email)
                .orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }
        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "firstName", user.getFirstName() != null ? user.getFirstName() : "",
                "lastName", user.getLastName() != null ? user.getLastName() : "",
                "headline", user.getHeadline() != null ? user.getHeadline() : "",
                "location", user.getLocation() != null ? user.getLocation() : "",
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "bio", user.getBio() != null ? user.getBio() : "",
                "skillsJson", user.getSkillsJson() != null ? user.getSkillsJson() : "[]"
        ));
    }
}
