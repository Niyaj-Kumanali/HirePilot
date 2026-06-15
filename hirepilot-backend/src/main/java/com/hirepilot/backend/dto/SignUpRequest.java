package com.hirepilot.backend.dto;

public record SignUpRequest(
    String email,
    String password,
    String firstName,
    String lastName
) {}
