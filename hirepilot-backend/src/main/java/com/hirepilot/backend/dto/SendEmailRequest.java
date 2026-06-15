package com.hirepilot.backend.dto;

import java.util.List;

public record SendEmailRequest(
    List<Long> managerIds
) {}
