package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.request.SignInRequest;
import com.hirepilot.backend.dto.request.SignUpRequest;
import com.hirepilot.backend.dto.response.JwtResponse;
import com.hirepilot.backend.entity.Role;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.exception.BadRequestException;
import com.hirepilot.backend.exception.ResourceNotFoundException;
import com.hirepilot.backend.exception.UnauthorizedAccessException;
import com.hirepilot.backend.repository.UserRepository;
import com.hirepilot.backend.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       JwtTokenProvider jwtTokenProvider,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public JwtResponse signUp(SignUpRequest request) {
        log.info("User sign-up attempt with email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Sign-up failed: email {} already exists", request.getEmail());
            throw new BadRequestException("User already exists with email: " + request.getEmail());
        }

        Role role = Optional.ofNullable(request.getRole())
                .map(r -> {
                    try {
                        return Role.valueOf(r.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        log.warn("Invalid role '{}' requested, defaulting to CANDIDATE", r);
                        return Role.CANDIDATE;
                    }
                })
                .orElse(Role.CANDIDATE);

        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setEmailVerified(false);

        UserEntity saved = userRepository.save(user);
        log.info("User registered successfully: {} with role {}", saved.getEmail(), saved.getRole());

        String token = jwtTokenProvider.generateAccessToken(saved.getEmail(), saved.getRole());

        return new JwtResponse(token, saved.getEmail(), saved.getFirstName(),
                saved.getLastName(), saved.getRole().name());
    }

    public JwtResponse signIn(SignInRequest request) {
        log.info("User sign-in attempt with email: {}", request.getEmail());

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Sign-in failed: user not found with email {}", request.getEmail());
                    return new ResourceNotFoundException("User", "email", request.getEmail());
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("Sign-in failed: invalid password for user {}", request.getEmail());
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        log.info("User signed in successfully: {}", user.getEmail());
        String token = jwtTokenProvider.generateAccessToken(user.getEmail(), user.getRole());

        return new JwtResponse(token, user.getEmail(), user.getFirstName(),
                user.getLastName(), user.getRole().name());
    }

    @Transactional(readOnly = true)
    public UserEntity getCurrentUser(String email) {
        log.debug("Fetching current user: {}", email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Current user not found: {}", email);
                    return new ResourceNotFoundException("User", "email", email);
                });
    }
}
