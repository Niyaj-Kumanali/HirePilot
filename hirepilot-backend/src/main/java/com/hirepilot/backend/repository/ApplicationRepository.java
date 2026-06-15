package com.hirepilot.backend.repository;

import com.hirepilot.backend.entity.Application;
import com.hirepilot.backend.entity.Application.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCandidateIdOrderByCreatedAtDesc(Long candidateId);

    List<Application> findByJobIdOrderByCreatedAtDesc(Long jobId);

    List<Application> findByJobRecruiterIdOrderByCreatedAtDesc(Long recruiterId);

    Optional<Application> findByJobIdAndCandidateId(Long jobId, Long candidateId);

    long countByJobId(Long jobId);

    long countByJobIdAndStatus(Long jobId, ApplicationStatus status);

    long countByCandidateId(Long candidateId);

    boolean existsByJobIdAndCandidateId(Long jobId, Long candidateId);
}
