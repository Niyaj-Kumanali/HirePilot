package com.hirepilot.backend.entity;

import com.hirepilot.backend.dto.response.JobPostResponse;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private JobPost job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private UserEntity candidate;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

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

    public enum ApplicationStatus {
        PENDING, REVIEWING, SHORTLISTED, REJECTED, ACCEPTED
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public JobPost getJob() { return job; }
    public void setJob(JobPost job) { this.job = job; }

    public UserEntity getCandidate() { return candidate; }
    public void setCandidate(UserEntity candidate) { this.candidate = candidate; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public record ApplicationInfo(
            Long id,
            JobPostResponse job,
            ApplicationStatus status,
            LocalDateTime appliedAt
    ) {}
}
