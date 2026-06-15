package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.request.JobPostRequest;
import com.hirepilot.backend.dto.response.ApiResponse;
import com.hirepilot.backend.dto.response.JobPostResponse;
import com.hirepilot.backend.entity.JobPost.JobStatus;
import com.hirepilot.backend.service.JobService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private static final Logger log = LoggerFactory.getLogger(JobController.class);

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobPostResponse>> createJob(
            @Valid @RequestBody JobPostRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("POST /api/jobs by user: {}", principal.getUsername());
        JobPostResponse response = jobService.createJob(request, principal.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job post created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobPostResponse>>> getAllJobs(
            @RequestParam(required = false) JobStatus status) {
        log.debug("GET /api/jobs with status filter: {}", status);
        List<JobPostResponse> jobs = jobService.getAllJobs(status);
        return ResponseEntity.ok(ApiResponse.success("Jobs retrieved successfully", jobs));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<ApiResponse<JobPostResponse>> getJobById(@PathVariable Long jobId) {
        log.debug("GET /api/jobs/{}", jobId);
        JobPostResponse job = jobService.getJobById(jobId);
        return ResponseEntity.ok(ApiResponse.success("Job retrieved successfully", job));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<JobPostResponse>>> getMyJobs(
            @AuthenticationPrincipal UserDetails principal) {
        log.debug("GET /api/jobs/my by user: {}", principal.getUsername());
        List<JobPostResponse> jobs = jobService.getJobsByRecruiter(principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Your jobs retrieved successfully", jobs));
    }

    @PutMapping("/{jobId}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobPostResponse>> updateJob(
            @PathVariable Long jobId,
            @Valid @RequestBody JobPostRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("PUT /api/jobs/{} by user: {}", jobId, principal.getUsername());
        JobPostResponse response = jobService.updateJob(jobId, request, principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully", response));
    }

    @PatchMapping("/{jobId}/status")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobPostResponse>> updateJobStatus(
            @PathVariable Long jobId,
            @RequestParam JobStatus status,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("PATCH /api/jobs/{}/status to {} by user: {}", jobId, status, principal.getUsername());
        JobPostResponse response = jobService.updateJobStatus(jobId, status, principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Job status updated successfully", response));
    }

    @DeleteMapping("/{jobId}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("DELETE /api/jobs/{} by user: {}", jobId, principal.getUsername());
        jobService.deleteJob(jobId, principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobPostResponse>>> searchJobs(
            @RequestParam String q) {
        log.debug("GET /api/jobs/search?q={}", q);
        List<JobPostResponse> jobs = jobService.searchJobs(q);
        return ResponseEntity.ok(ApiResponse.success("Search results", jobs));
    }
}
