package com.hirepilot.backend.exception;

public class UnauthorizedAccessException extends RuntimeException {

    private final String requiredRole;
    private final String userEmail;

    public UnauthorizedAccessException(String message) {
        super(message);
        this.requiredRole = null;
        this.userEmail = null;
    }

    public UnauthorizedAccessException(String userEmail, String requiredRole) {
        super(String.format("User '%s' does not have required role: %s", userEmail, requiredRole));
        this.userEmail = userEmail;
        this.requiredRole = requiredRole;
    }

    public String getRequiredRole() { return requiredRole; }
    public String getUserEmail() { return userEmail; }
}
