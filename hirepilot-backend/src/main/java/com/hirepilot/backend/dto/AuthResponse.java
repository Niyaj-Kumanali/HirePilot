package com.hirepilot.backend.dto;

public record AuthResponse(
    String token,
    String email,
    String firstName,
    String lastName
) {}
