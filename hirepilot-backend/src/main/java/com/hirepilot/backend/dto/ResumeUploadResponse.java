package com.hirepilot.backend.dto;

public record ResumeUploadResponse(
    Long id,
    String fileName,
    String parsedResumeJson,
    String message
) {}
