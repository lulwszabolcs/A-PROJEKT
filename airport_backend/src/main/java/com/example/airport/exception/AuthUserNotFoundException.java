package com.example.airport.exception;

public class AuthUserNotFoundException extends RuntimeException {
    public AuthUserNotFoundException(String message) {
        super(message);
    }
}
