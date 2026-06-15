package com.hirepilot.backend.dto.response;

import com.hirepilot.backend.entity.JobPost.JobStatus;

import java.time.LocalDateTime;
import java.util.Set;

public class JobPostResponse {

    private Long id;
    private String title;
    private String description;
    private Set<String> requiredSkills;
    private String location;
    private String department;
    private JobStatus status;
    private String recruiterEmail;
    private String recruiterName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobPostResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public String getRecruiterEmail() { return recruiterEmail; }
    public void setRecruiterEmail(String recruiterEmail) { this.recruiterEmail = recruiterEmail; }

    public String getRecruiterName() { return recruiterName; }
    public void setRecruiterName(String recruiterName) { this.recruiterName = recruiterName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static final class Builder {
        private Long id;
        private String title;
        private String description;
        private Set<String> requiredSkills;
        private String location;
        private String department;
        private JobStatus status;
        private String recruiterEmail;
        private String recruiterName;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        private Builder() {}

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder requiredSkills(Set<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder status(JobStatus status) { this.status = status; return this; }
        public Builder recruiterEmail(String recruiterEmail) { this.recruiterEmail = recruiterEmail; return this; }
        public Builder recruiterName(String recruiterName) { this.recruiterName = recruiterName; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public JobPostResponse build() {
            JobPostResponse response = new JobPostResponse();
            response.id = this.id;
            response.title = this.title;
            response.description = this.description;
            response.requiredSkills = this.requiredSkills;
            response.location = this.location;
            response.department = this.department;
            response.status = this.status;
            response.recruiterEmail = this.recruiterEmail;
            response.recruiterName = this.recruiterName;
            response.createdAt = this.createdAt;
            response.updatedAt = this.updatedAt;
            return response;
        }
    }
}
