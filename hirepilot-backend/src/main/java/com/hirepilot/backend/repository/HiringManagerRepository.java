package com.hirepilot.backend.repository;

import com.hirepilot.backend.entity.HiringManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HiringManagerRepository extends JpaRepository<HiringManagerEntity, Long> {
    List<HiringManagerEntity> findByUserIdOrderByIdDesc(Long userId);
    List<HiringManagerEntity> findByUserIdAndStatus(Long userId, String status);
    Optional<HiringManagerEntity> findByIdAndUserId(Long id, Long userId);
    List<HiringManagerEntity> findByUserIdAndEmailAndStatus(Long userId, String email, String status);
    long countByUserIdAndEmailAndStatus(Long userId, String email, String status);
}
