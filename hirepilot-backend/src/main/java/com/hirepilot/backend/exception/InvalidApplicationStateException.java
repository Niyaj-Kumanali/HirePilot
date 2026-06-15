package com.hirepilot.backend.exception;

public class InvalidApplicationStateException extends RuntimeException {

    private final String currentState;
    private final String attemptedOperation;

    public InvalidApplicationStateException(String currentState, String attemptedOperation) {
        super(String.format("Cannot %s in current state: %s", attemptedOperation, currentState));
        this.currentState = currentState;
        this.attemptedOperation = attemptedOperation;
    }

    public String getCurrentState() { return currentState; }
    public String getAttemptedOperation() { return attemptedOperation; }
}
