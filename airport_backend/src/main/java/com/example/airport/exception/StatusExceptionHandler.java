package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class StatusExceptionHandler {
    @ExceptionHandler(value = StatusNotFoundException.class)
    public ResponseEntity<String> handleStatusNotFound(StatusNotFoundException ex) {
        return new ResponseEntity<>("STATUS_NOT_FOUND", HttpStatus.I_AM_A_TEAPOT);
    }
}
