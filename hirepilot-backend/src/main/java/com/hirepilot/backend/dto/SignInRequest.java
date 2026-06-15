package com.hirepilot.backend.dto;

public record SignInRequest(
    String email,
    String password
) {}
