package com.hirepilot.backend.dto;

public record EmailSendRequest(
    String toEmail,
    String toName,
    String subject,
    String body,
    String jobTitle,
    String jobCompany,
    String jobLocation
) {}
