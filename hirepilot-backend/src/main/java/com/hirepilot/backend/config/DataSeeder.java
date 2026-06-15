package com.hirepilot.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(UserRepository userRepository, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) {
        try {
            ClassPathResource resource = new ClassPathResource("users.json");
            if (!resource.exists()) return;

            try (InputStream is = resource.getInputStream()) {
                List<Map<String, Object>> users = objectMapper.readValue(
                        is, new TypeReference<List<Map<String, Object>>>() {});

                for (Map<String, Object> data : users) {
                    String email = (String) data.get("email");
                    if (userRepository.existsByEmail(email)) continue;

                    UserEntity user = new UserEntity();
                    user.setEmail(email);
                    user.setPasswordHash(BCrypt.hashpw((String) data.get("password"), BCrypt.gensalt()));
                    user.setFirstName((String) data.get("firstName"));
                    user.setLastName((String) data.get("lastName"));
                    user.setHeadline((String) data.get("headline"));
                    user.setLocation((String) data.get("location"));
                    user.setPhone((String) data.get("phone"));
                    user.setBio((String) data.get("bio"));
                    user.setSkillsJson((String) data.get("skillsJson"));
                    userRepository.save(user);

                    System.out.println("Seeded user: " + email);
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to seed users: " + e.getMessage());
        }
    }
}
