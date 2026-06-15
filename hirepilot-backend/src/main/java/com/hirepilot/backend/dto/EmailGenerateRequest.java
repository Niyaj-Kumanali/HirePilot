package com.hirepilot.backend.dto;

public record EmailGenerateRequest(
    String jobTitle,
    String jobCompany,
    String hiringManagerName,
    String userSkills,
    String userExperience
) {}
