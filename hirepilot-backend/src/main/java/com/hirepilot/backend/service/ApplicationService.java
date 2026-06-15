package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.request.ApplicationRequest;
import com.hirepilot.backend.entity.Application;
import com.hirepilot.backend.entity.Application.ApplicationStatus;
import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.exception.BadRequestException;
import com.hirepilot.backend.exception.InvalidApplicationStateException;
import com.hirepilot.backend.exception.ResourceNotFoundException;
import com.hirepilot.backend.mapper.ApplicationMapper;
import com.hirepilot.backend.repository.ApplicationRepository;
import com.hirepilot.backend.repository.JobPostRepository;
import com.hirepilot.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ApplicationService {

    private static final Logger log = LoggerFactory.getLogger(ApplicationService.class);

    private final ApplicationRepository applicationRepository;
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    private final ApplicationMapper applicationMapper;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobPostRepository jobPostRepository,
                              UserRepository userRepository,
                              ApplicationMapper applicationMapper) {
        this.applicationRepository = applicationRepository;
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
        this.applicationMapper = applicationMapper;
    }

    public Application.ApplicationInfo apply(ApplicationRequest request, String candidateEmail) {
        log.info("Candidate {} applying for job {}", candidateEmail, request.getJobId());

        UserEntity candidate = userRepository.findByEmail(candidateEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", candidateEmail));

        JobPost jobPost = jobPostRepository.findById(request.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", request.getJobId()));

        if (jobPost.getStatus() != JobPost.JobStatus.PUBLISHED) {
            log.warn("Cannot apply to job {} with status {}", jobPost.getId(), jobPost.getStatus());
            throw new InvalidApplicationStateException(
                    jobPost.getStatus().name(), "apply to this job");
        }

        if (applicationRepository.existsByJobIdAndCandidateId(request.getJobId(), candidate.getId())) {
            log.warn("Candidate {} already applied to job {}", candidateEmail, request.getJobId());
            throw new BadRequestException("You have already applied to this job");
        }

        Application application = new Application();
        application.setJob(jobPost);
        application.setCandidate(candidate);
        application.setCoverLetter(request.getCoverLetter());
        application.setStatus(ApplicationStatus.PENDING);

        Application saved = applicationRepository.save(application);
        log.info("Application created with id: {} for job: {} by candidate: {}",
                saved.getId(), request.getJobId(), candidateEmail);

        return applicationMapper.toApplicationInfo(saved);
    }

    @Transactional(readOnly = true)
    public List<Application.ApplicationInfo> getApplicationsByCandidate(String candidateEmail) {
        log.debug("Fetching applications for candidate: {}", candidateEmail);
        UserEntity candidate = userRepository.findByEmail(candidateEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", candidateEmail));

        return applicationRepository.findByCandidateIdOrderByCreatedAtDesc(candidate.getId())
                .stream()
                .map(applicationMapper::toApplicationInfo)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<Application.ApplicationInfo> getApplicationsByJob(Long jobId) {
        log.debug("Fetching applications for job: {}", jobId);
        return applicationRepository.findByJobIdOrderByCreatedAtDesc(jobId)
                .stream()
                .map(applicationMapper::toApplicationInfo)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<Application.ApplicationInfo> getApplicationsForRecruiter(String recruiterEmail) {
        log.debug("Fetching applications for recruiter: {}", recruiterEmail);
        UserEntity recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", recruiterEmail));

        return applicationRepository.findByJobRecruiterIdOrderByCreatedAtDesc(recruiter.getId())
                .stream()
                .map(applicationMapper::toApplicationInfo)
                .toList();
    }

    public Application.ApplicationInfo updateApplicationStatus(
            Long applicationId, ApplicationStatus newStatus, String userEmail) {
        log.info("Updating application {} status to {} by user: {}",
                applicationId, newStatus, userEmail);

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        validateStatusTransition(application.getStatus(), newStatus);
        application.setStatus(newStatus);
        Application saved = applicationRepository.save(application);

        log.info("Application {} status updated to {}", applicationId, newStatus);
        return applicationMapper.toApplicationInfo(saved);
    }

    @Transactional(readOnly = true)
    public long getApplicationCountByCandidate(String candidateEmail) {
        return userRepository.findByEmail(candidateEmail)
                .map(user -> applicationRepository.countByCandidateId(user.getId()))
                .orElse(0L);
    }

    private void validateStatusTransition(ApplicationStatus current, ApplicationStatus next) {
        if (current == ApplicationStatus.REJECTED || current == ApplicationStatus.ACCEPTED) {
            throw new InvalidApplicationStateException(current.name(),
                    "change status to " + next);
        }
        log.debug("Status transition validated: {} -> {}", current, next);
    }
}
