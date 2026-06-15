package com.hirepilot.backend.dto;

public record BatchActionResponse(
    int successCount,
    int failCount,
    String message
) {}
