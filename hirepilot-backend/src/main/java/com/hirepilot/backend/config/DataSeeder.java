package com.hirepilot.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hirepilot.backend.entity.JobPost;
import com.hirepilot.backend.entity.JobPost.JobStatus;
import com.hirepilot.backend.entity.Role;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.JobPostRepository;
import com.hirepilot.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Order(1)
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final JobPostRepository jobPostRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      JobPostRepository jobPostRepository,
                      ObjectMapper objectMapper,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jobPostRepository = jobPostRepository;
        this.objectMapper = objectMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        log.info("========================================");
        log.info("  DataSeeder starting...");
        log.info("========================================");

        if (userRepository.count() == 0) {
            seedUsers();
        } else {
            log.info("Users table already populated, skipping user seed");
        }

        if (jobPostRepository.count() == 0) {
            seedJobs();
        } else {
            log.info("Job posts table already populated, skipping job seed");
        }

        log.info("========================================");
        log.info("  DataSeeder completed");
        log.info("========================================");
    }

    // ========== USER SEEDING ==========

    private void seedUsers() {
        log.info("Seeding users from users.json...");

        List<Map<String, Object>> usersData = readJsonFile("users.json");
        if (usersData == null) return;

        List<UserEntity> users = usersData.stream()
                .map(this::parseUser)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        List<UserEntity> saved = userRepository.saveAll(users);
        log.info("Seeded {} user(s) into the database", saved.size());

        saved.forEach(u -> log.debug("  → {} ({})", u.getEmail(), u.getRole()));
    }

    private Optional<UserEntity> parseUser(Map<String, Object> data) {
        String email = (String) data.get("email");
        if (email == null || email.isBlank()) {
            log.warn("Skipping user entry with missing email");
            return Optional.empty();
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode((String) data.get("password")));
        user.setFirstName((String) data.get("firstName"));
        user.setLastName((String) data.get("lastName"));

        Optional.ofNullable(data.get("role"))
                .map(Object::toString)
                .map(r -> {
                    try { return Role.valueOf(r.toUpperCase()); }
                    catch (IllegalArgumentException e) {
                        log.warn("Invalid role '{}' for user {}, defaulting to CANDIDATE", r, email);
                        return Role.CANDIDATE;
                    }
                })
                .ifPresent(user::setRole);

        user.setHeadline((String) data.get("headline"));
        user.setLocation((String) data.get("location"));
        user.setPhone((String) data.get("phone"));
        user.setBio((String) data.get("bio"));
        user.setSkillsJson((String) data.get("skillsJson"));

        return Optional.of(user);
    }

    // ========== JOB POST SEEDING ==========

    private void seedJobs() {
        log.info("Seeding job posts from jobs.json...");

        List<Map<String, Object>> jobsData = readJsonFile("jobs.json");
        if (jobsData == null) return;

        List<JobPost> jobs = jobsData.stream()
                .map(this::parseJobPost)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        List<JobPost> saved = jobPostRepository.saveAll(jobs);
        log.info("Seeded {} job post(s) into the database", saved.size());

        saved.forEach(j -> log.debug("  → {} ({})", j.getTitle(), j.getStatus()));
    }

    private Optional<JobPost> parseJobPost(Map<String, Object> data) {
        String title = (String) data.get("title");
        if (title == null || title.isBlank()) {
            log.warn("Skipping job post with missing title");
            return Optional.empty();
        }

        String recruiterEmail = (String) data.get("recruiterEmail");
        UserEntity recruiter = userRepository.findByEmail(recruiterEmail).orElse(null);
        if (recruiter == null) {
            log.warn("Skipping job '{}': recruiter '{}' not found", title, recruiterEmail);
            return Optional.empty();
        }

        Set<String> skills = Optional.ofNullable(data.get("requiredSkills"))
                .filter(List.class::isInstance)
                .map(raw -> ((List<?>) raw).stream()
                        .filter(Objects::nonNull)
                        .map(Object::toString)
                        .collect(Collectors.toSet()))
                .orElseGet(HashSet::new);

        JobStatus status = Optional.ofNullable(data.get("status"))
                .map(Object::toString)
                .map(s -> {
                    try { return JobStatus.valueOf(s.toUpperCase()); }
                    catch (IllegalArgumentException e) {
                        log.warn("Invalid status '{}' for job '{}', defaulting to DRAFT", s, title);
                        return JobStatus.DRAFT;
                    }
                })
                .orElse(JobStatus.DRAFT);

        JobPost job = JobPost.builder()
                .title(title)
                .description((String) data.get("description"))
                .requiredSkills(skills)
                .location((String) data.get("location"))
                .department((String) data.get("department"))
                .status(status)
                .recruiter(recruiter)
                .build();

        return Optional.of(job);
    }

    // ========== UTILITY ==========

    private List<Map<String, Object>> readJsonFile(String filename) {
        try {
            ClassPathResource resource = new ClassPathResource(filename);
            if (!resource.exists()) {
                log.warn("{} not found in classpath, skipping", filename);
                return null;
            }
            try (InputStream is = resource.getInputStream()) {
                return objectMapper.readValue(is, new TypeReference<List<Map<String, Object>>>() {});
            }
        } catch (Exception e) {
            log.error("Failed to read {}: {}", filename, e.getMessage(), e);
            return null;
        }
    }
}
