package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ProblemExceptionHandler {
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "PROBLEM_NOT_FOUND")
    @ExceptionHandler(value = ProblemNotFoundException.class)
    public void handleProblemNotFound(ProblemNotFoundException ex) {

    }
}
