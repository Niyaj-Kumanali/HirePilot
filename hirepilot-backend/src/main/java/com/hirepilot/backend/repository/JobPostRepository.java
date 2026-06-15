package com.hirepilot.backend.repository;

import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.JobPost.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {

    List<JobPost> findByRecruiterIdOrderByCreatedAtDesc(Long recruiterId);

    List<JobPost> findByStatusOrderByCreatedAtDesc(JobStatus status);

    Optional<JobPost> findByIdAndRecruiterId(Long id, Long recruiterId);

    long countByRecruiterId(Long recruiterId);

    long countByStatus(JobStatus status);
}
