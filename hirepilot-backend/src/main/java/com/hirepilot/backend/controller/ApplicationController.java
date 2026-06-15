package com.hirepilot.backend.controller;

import com.hirepilot.backend.dto.request.ApplicationRequest;
import com.hirepilot.backend.dto.response.ApiResponse;
import com.hirepilot.backend.entity.Application.ApplicationInfo;
import com.hirepilot.backend.entity.Application.ApplicationStatus;
import com.hirepilot.backend.service.ApplicationService;
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
@RequestMapping("/api/applications")
public class ApplicationController {

    private static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<ApiResponse<ApplicationInfo>> apply(
            @Valid @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("POST /api/applications by candidate: {}", principal.getUsername());
        ApplicationInfo info = applicationService.apply(request, principal.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", info));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<ApiResponse<List<ApplicationInfo>>> getMyApplications(
            @AuthenticationPrincipal UserDetails principal) {
        log.debug("GET /api/applications/my by user: {}", principal.getUsername());
        List<ApplicationInfo> applications = applicationService.getApplicationsByCandidate(principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ApplicationInfo>>> getApplicationsByJob(
            @PathVariable Long jobId) {
        log.debug("GET /api/applications/job/{}", jobId);
        List<ApplicationInfo> applications = applicationService.getApplicationsByJob(jobId);
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ApplicationInfo>>> getApplicationsForRecruiter(
            @AuthenticationPrincipal UserDetails principal) {
        log.debug("GET /api/applications/recruiter by user: {}", principal.getUsername());
        List<ApplicationInfo> applications = applicationService.getApplicationsForRecruiter(principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applications));
    }

    @PatchMapping("/{applicationId}/status")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ApplicationInfo>> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status,
            @AuthenticationPrincipal UserDetails principal) {
        log.info("PATCH /api/applications/{}/status to {} by user: {}",
                applicationId, status, principal.getUsername());
        ApplicationInfo info = applicationService.updateApplicationStatus(
                applicationId, status, principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Application status updated successfully", info));
    }
}
