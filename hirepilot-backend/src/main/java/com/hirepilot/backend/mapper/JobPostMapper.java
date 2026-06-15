package com.hirepilot.backend.mapper;

import com.hirepilot.backend.dto.request.JobPostRequest;
import com.hirepilot.backend.dto.response.JobPostResponse;
import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JobPostMapper {

    private static final Logger log = LoggerFactory.getLogger(JobPostMapper.class);

    public JobPost toEntity(JobPostRequest request, UserEntity recruiter) {
        log.debug("Mapping JobPostRequest to JobPost entity for recruiter: {}", recruiter.getEmail());

        return JobPost.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .requiredSkills(Optional.ofNullable(request.getRequiredSkills())
                        .orElseGet(java.util.HashSet::new))
                .location(request.getLocation())
                .department(request.getDepartment())
                .recruiter(recruiter)
                .build();
    }

    public JobPostResponse toResponse(JobPost jobPost) {
        log.debug("Mapping JobPost entity to JobPostResponse for job: {}", jobPost.getId());

        return JobPostResponse.builder()
                .id(jobPost.getId())
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .requiredSkills(jobPost.getRequiredSkills())
                .location(jobPost.getLocation())
                .department(jobPost.getDepartment())
                .status(jobPost.getStatus())
                .recruiterEmail(Optional.ofNullable(jobPost.getRecruiter())
                        .map(UserEntity::getEmail)
                        .orElse(null))
                .recruiterName(Optional.ofNullable(jobPost.getRecruiter())
                        .map(r -> (r.getFirstName() != null ? r.getFirstName() : "") + " " +
                                (r.getLastName() != null ? r.getLastName() : ""))
                        .map(String::trim)
                        .filter(name -> !name.isEmpty())
                        .orElse(null))
                .createdAt(jobPost.getCreatedAt())
                .updatedAt(jobPost.getUpdatedAt())
                .build();
    }

    public List<JobPostResponse> toResponseList(List<JobPost> jobPosts) {
        return jobPosts.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEntityFromRequest(JobPost existing, JobPostRequest request) {
        Optional.ofNullable(request.getTitle()).ifPresent(existing::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(existing::setDescription);
        Optional.ofNullable(request.getRequiredSkills()).ifPresent(existing::setRequiredSkills);
        Optional.ofNullable(request.getLocation()).ifPresent(existing::setLocation);
        Optional.ofNullable(request.getDepartment()).ifPresent(existing::setDepartment);
        log.debug("Updated JobPost {} from request", existing.getId());
    }

    public List<JobPostResponse> filterByStatus(List<JobPost> jobPosts, JobPost.JobStatus status) {
        return jobPosts.stream()
                .filter(job -> job.getStatus() == status)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<JobPostResponse> searchByKeyword(List<JobPost> jobPosts, String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return jobPosts.stream()
                .filter(job -> job.getTitle().toLowerCase().contains(lowerKeyword)
                        || job.getDescription().toLowerCase().contains(lowerKeyword)
                        || job.getRequiredSkills().stream()
                                .anyMatch(skill -> skill.toLowerCase().contains(lowerKeyword)))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
