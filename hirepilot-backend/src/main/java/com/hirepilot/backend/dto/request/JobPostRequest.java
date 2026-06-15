package com.hirepilot.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class JobPostRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Job description is required")
    private String description;

    private Set<String> requiredSkills = new HashSet<>();

    private String location;

    private String department;

    public JobPostRequest() {}

    public JobPostRequest(String title, String description, Set<String> requiredSkills,
                          String location, String department) {
        this.title = title;
        this.description = description;
        this.requiredSkills = requiredSkills != null ? requiredSkills : new HashSet<>();
        this.location = location;
        this.department = department;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Set<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(Set<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
