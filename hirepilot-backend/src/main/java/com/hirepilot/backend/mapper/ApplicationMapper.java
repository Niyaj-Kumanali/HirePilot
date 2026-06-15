package com.hirepilot.backend.mapper;

import com.hirepilot.backend.dto.response.JobPostResponse;
import com.hirepilot.backend.entity.Application;
import com.hirepilot.backend.entity.Application.ApplicationStatus;
import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ApplicationMapper {

    private static final Logger log = LoggerFactory.getLogger(ApplicationMapper.class);

    public Application.ApplicationInfo toApplicationInfo(Application app) {
        log.debug("Mapping Application {} to ApplicationInfo", app.getId());

        JobPost job = app.getJob();
        UserEntity recruiter = job.getRecruiter();

        JobPostResponse jobResponse = JobPostResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .location(job.getLocation())
                .department(job.getDepartment())
                .status(job.getStatus())
                .recruiterEmail(Optional.ofNullable(recruiter).map(UserEntity::getEmail).orElse(null))
                .build();

        return new Application.ApplicationInfo(
                app.getId(),
                jobResponse,
                app.getStatus(),
                app.getCreatedAt()
        );
    }

    public List<Application.ApplicationInfo> toInfoList(List<Application> applications) {
        return applications.stream()
                .map(this::toApplicationInfo)
                .collect(Collectors.toList());
    }

    public List<Application> filterByStatus(List<Application> applications, ApplicationStatus status) {
        return applications.stream()
                .filter(app -> app.getStatus() == status)
                .collect(Collectors.toList());
    }
}
