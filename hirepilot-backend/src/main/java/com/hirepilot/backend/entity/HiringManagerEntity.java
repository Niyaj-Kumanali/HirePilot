package com.hirepilot.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hiring_managers")
public class HiringManagerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String jobTitle;

    private String jobLocation;

    @Column(columnDefinition = "TEXT")
    private String generatedSubject;

    @Column(columnDefinition = "TEXT")
    private String generatedBody;

    @Column(nullable = false)
    private String status;

    private LocalDateTime sentAt;

    private String batchFileName;

    @Column(nullable = false)
    private int sendCount;

    @Column(nullable = false)
    private boolean resendConfirmed;

    @PrePersist
    protected void onCreate() {
        if (status == null) status = "PENDING";
        sendCount = 0;
        resendConfirmed = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getJobLocation() { return jobLocation; }
    public void setJobLocation(String jobLocation) { this.jobLocation = jobLocation; }

    public String getGeneratedSubject() { return generatedSubject; }
    public void setGeneratedSubject(String generatedSubject) { this.generatedSubject = generatedSubject; }

    public String getGeneratedBody() { return generatedBody; }
    public void setGeneratedBody(String generatedBody) { this.generatedBody = generatedBody; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public String getBatchFileName() { return batchFileName; }
    public void setBatchFileName(String batchFileName) { this.batchFileName = batchFileName; }

    public int getSendCount() { return sendCount; }
    public void setSendCount(int sendCount) { this.sendCount = sendCount; }

    public boolean isResendConfirmed() { return resendConfirmed; }
    public void setResendConfirmed(boolean resendConfirmed) { this.resendConfirmed = resendConfirmed; }
}
