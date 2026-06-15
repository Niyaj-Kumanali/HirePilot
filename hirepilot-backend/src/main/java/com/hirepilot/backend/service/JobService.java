package com.hirepilot.backend.service;

import com.hirepilot.backend.dto.request.JobPostRequest;
import com.hirepilot.backend.dto.response.JobPostResponse;
import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.JobPost.JobStatus;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.exception.ResourceNotFoundException;
import com.hirepilot.backend.mapper.JobPostMapper;
import com.hirepilot.backend.repository.JobPostRepository;
import com.hirepilot.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobService {

    private static final Logger log = LoggerFactory.getLogger(JobService.class);

    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    private final JobPostMapper jobPostMapper;

    public JobService(JobPostRepository jobPostRepository,
                      UserRepository userRepository,
                      JobPostMapper jobPostMapper) {
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
        this.jobPostMapper = jobPostMapper;
    }

    public JobPostResponse createJob(JobPostRequest request, String recruiterEmail) {
        log.info("Creating job post for recruiter: {}", recruiterEmail);

        UserEntity recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", recruiterEmail));

        JobPost jobPost = jobPostMapper.toEntity(request, recruiter);
        JobPost saved = jobPostRepository.save(jobPost);

        log.info("Job post created with id: {} by recruiter: {}", saved.getId(), recruiterEmail);
        return jobPostMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public JobPostResponse getJobById(Long jobId) {
        log.debug("Fetching job post by id: {}", jobId);
        return jobPostRepository.findById(jobId)
                .map(jobPostMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));
    }

    @Transactional(readOnly = true)
    public List<JobPostResponse> getAllJobs(JobStatus status) {
        log.debug("Fetching all jobs with status filter: {}", status);
        List<JobPost> jobs = status != null
                ? jobPostRepository.findByStatusOrderByCreatedAtDesc(status)
                : jobPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return jobPostMapper.toResponseList(jobs);
    }

    @Transactional(readOnly = true)
    public List<JobPostResponse> getJobsByRecruiter(String recruiterEmail) {
        log.debug("Fetching jobs for recruiter: {}", recruiterEmail);
        UserEntity recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", recruiterEmail));

        return jobPostRepository.findByRecruiterIdOrderByCreatedAtDesc(recruiter.getId())
                .stream()
                .map(jobPostMapper::toResponse)
                .toList();
    }

    public JobPostResponse updateJob(Long jobId, JobPostRequest request, String userEmail) {
        log.info("Updating job post {} by user: {}", jobId, userEmail);

        JobPost jobPost = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));

        jobPostMapper.updateEntityFromRequest(jobPost, request);
        JobPost saved = jobPostRepository.save(jobPost);

        log.info("Job post {} updated successfully", jobId);
        return jobPostMapper.toResponse(saved);
    }

    public JobPostResponse updateJobStatus(Long jobId, JobStatus newStatus, String userEmail) {
        log.info("Updating job {} status to {} by user: {}", jobId, newStatus, userEmail);

        JobPost jobPost = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));

        jobPost.setStatus(newStatus);
        JobPost saved = jobPostRepository.save(jobPost);

        log.info("Job post {} status updated to {}", jobId, newStatus);
        return jobPostMapper.toResponse(saved);
    }

    public void deleteJob(Long jobId, String userEmail) {
        log.info("Deleting job post {} by user: {}", jobId, userEmail);

        JobPost jobPost = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobPost", "id", jobId));

        jobPostRepository.delete(jobPost);
        log.info("Job post {} deleted successfully", jobId);
    }

    @Transactional(readOnly = true)
    public List<JobPostResponse> searchJobs(String keyword) {
        log.debug("Searching jobs with keyword: {}", keyword);
        List<JobPost> allJobs = jobPostRepository.findByStatusOrderByCreatedAtDesc(JobStatus.PUBLISHED);
        return jobPostMapper.searchByKeyword(allJobs, keyword);
    }

    @Transactional(readOnly = true)
    public long getJobCountByRecruiter(String recruiterEmail) {
        return userRepository.findByEmail(recruiterEmail)
                .map(user -> jobPostRepository.countByRecruiterId(user.getId()))
                .orElse(0L);
    }
}
