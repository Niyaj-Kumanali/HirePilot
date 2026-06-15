package com.hirepilot.backend.dto;

public record ResendConfirmRequest(
    Long managerId,
    boolean confirmed
) {}
