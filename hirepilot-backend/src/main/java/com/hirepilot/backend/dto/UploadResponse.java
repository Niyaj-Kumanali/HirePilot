package com.hirepilot.backend.dto;

import java.util.List;

public record UploadResponse(
    int totalRows,
    int duplicates,
    int newRows,
    List<HiringManagerRow> rows,
    String message
) {}
