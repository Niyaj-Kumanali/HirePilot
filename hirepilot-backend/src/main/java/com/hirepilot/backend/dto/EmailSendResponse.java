package com.hirepilot.backend.dto;

public record EmailSendResponse(
    Long id,
    String status,
    String message
) {}
