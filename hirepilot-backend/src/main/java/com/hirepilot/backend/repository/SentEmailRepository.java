package com.hirepilot.backend.repository;

import com.hirepilot.backend.entity.SentEmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SentEmailRepository extends JpaRepository<SentEmailEntity, Long> {
    List<SentEmailEntity> findByUserIdOrderBySentAtDesc(Long userId);
}
