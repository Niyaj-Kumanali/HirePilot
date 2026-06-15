package com.hirepilot.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "job_posts")
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private Set<String> requiredSkills = new HashSet<>();

    private String location;

    private String department;

    @Enumerated(EnumType.STRING)
    private JobStatus status = JobStatus.DRAFT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruiter_id", nullable = false)
    private UserEntity recruiter;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum JobStatus {
        DRAFT, PUBLISHED, CLOSED, FILLED
    }

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

    public UserEntity getRecruiter() { return recruiter; }
    public void setRecruiter(UserEntity recruiter) { this.recruiter = recruiter; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private String title;
        private String description;
        private Set<String> requiredSkills = new HashSet<>();
        private String location;
        private String department;
        private JobStatus status = JobStatus.DRAFT;
        private UserEntity recruiter;

        private Builder() {}

        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder requiredSkills(Set<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
        public Builder addSkill(String skill) { this.requiredSkills.add(skill); return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder status(JobStatus status) { this.status = status; return this; }
        public Builder recruiter(UserEntity recruiter) { this.recruiter = recruiter; return this; }

        public JobPost build() {
            JobPost job = new JobPost();
            job.title = this.title;
            job.description = this.description;
            job.requiredSkills = this.requiredSkills;
            job.location = this.location;
            job.department = this.department;
            job.status = this.status;
            job.recruiter = this.recruiter;
            return job;
        }
    }
}
