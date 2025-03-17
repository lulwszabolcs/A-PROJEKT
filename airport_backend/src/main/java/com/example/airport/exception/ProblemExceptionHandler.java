package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ProblemExceptionHandler {
    @ExceptionHandler(ProblemNotFoundException.class)
    public ResponseEntity<String> handleProblemNotFound(ProblemNotFoundException ex) {
        return new ResponseEntity<>("PROBLEM_NOT_FOUND", HttpStatus.I_AM_A_TEAPOT);
    }
}
