package com.hirepilot.backend.repository;

import com.hirepilot.backend.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByInterviewerIdOrderByScheduledAtDesc(Long interviewerId);

    List<Interview> findByApplicationIdOrderByScheduledAtDesc(Long applicationId);

    List<Interview> findByScheduledAtBetween(LocalDateTime start, LocalDateTime end);

    long countByInterviewerIdAndStatus(Long interviewerId, Interview.InterviewStatus status);
}
