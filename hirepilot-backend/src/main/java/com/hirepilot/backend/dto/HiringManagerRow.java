package com.hirepilot.backend.dto;

import java.time.LocalDateTime;

public record HiringManagerRow(
    Long id,
    String name,
    String email,
    String company,
    String jobTitle,
    String jobLocation,
    String generatedSubject,
    String generatedBody,
    String status,
    LocalDateTime sentAt,
    int sendCount,
    boolean resendConfirmed,
    boolean duplicate
) {}
