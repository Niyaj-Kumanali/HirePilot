package com.hirepilot.backend.dto;

public record ResumeUploadResponse(
    Long id,
    String fileName,
    String fileUrl,
    String message
) {}
