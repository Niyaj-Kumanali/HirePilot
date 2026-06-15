package com.hirepilot.backend.dto;

import java.time.LocalDateTime;

public record EmailHistoryItem(
    Long id,
    String toEmail,
    String toName,
    String subject,
    String body,
    String jobTitle,
    String jobCompany,
    String status,
    LocalDateTime sentAt
) {}
