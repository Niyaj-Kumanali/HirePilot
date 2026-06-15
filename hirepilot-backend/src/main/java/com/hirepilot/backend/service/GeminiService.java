package com.hirepilot.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiService {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    private static final int MAX_RETRIES = 3;

    private final String apiKey;
    private final RestTemplate restTemplate;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.restTemplate = new RestTemplate();
    }

    public String generateContent(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of(
                "parts", List.of(Map.of("text", prompt))
            )),
            "generationConfig", Map.of(
                "temperature", 0.7
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        RuntimeException lastException = null;
        for (int attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                ResponseEntity<Map> response = restTemplate.postForEntity(
                    GEMINI_API_URL + "?key=" + apiKey,
                    request,
                    Map.class
                );

                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null) {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                    if (candidates != null && !candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        if (content != null) {
                            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                            if (parts != null && !parts.isEmpty()) {
                                return (String) parts.get(0).get("text");
                            }
                        }
                    }
                }
                throw new RuntimeException("Empty response from Gemini API");
            } catch (Exception e) {
                lastException = new RuntimeException("Gemini API call failed: " + e.getMessage(), e);
                String msg = e.getMessage();
                if (msg != null && msg.contains("429")) {
                    long delay = extractRetryDelay(msg);
                    if (delay > 0 && attempt < MAX_RETRIES - 1) {
                        try {
                            Thread.sleep(delay);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            throw lastException;
                        }
                        continue;
                    }
                }
                throw lastException;
            }
        }
        throw lastException;
    }

    private long extractRetryDelay(String errorMessage) {
        Pattern pattern = Pattern.compile("retryDelay.*?(\\d+(?:\\.\\d+)?)\\s*s");
        Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            double seconds = Double.parseDouble(matcher.group(1));
            return (long) (seconds * 1000) + 1000;
        }
        return 5000;
    }
}
