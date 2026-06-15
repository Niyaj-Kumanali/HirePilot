package com.hirepilot.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hirepilot.backend.entity.UserEntity;
import com.hirepilot.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ResumeService {

    private final Cloudinary cloudinary;
    private final UserRepository userRepository;

    public ResumeService(Cloudinary cloudinary, UserRepository userRepository) {
        this.cloudinary = cloudinary;
        this.userRepository = userRepository;
    }

    public String uploadResume(MultipartFile file, String email) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "auto",
                "folder", "resumes"
        ));
        String fileUrl = (String) uploadResult.get("secure_url");

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setResumeFilePath(fileUrl);
        userRepository.save(user);

        return fileUrl;
    }

    public String getResumeUrl(String email) {
        return userRepository.findByEmail(email)
                .map(UserEntity::getResumeFilePath)
                .orElse(null);
    }
}
