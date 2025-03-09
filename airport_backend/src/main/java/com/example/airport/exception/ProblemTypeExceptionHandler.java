package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ProblemTypeExceptionHandler {
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "PROBLEM_TYPE_NOT_FOUND")
    @ExceptionHandler(value = { ProblemTypeNotFoundException.class })
    public void handleProblemTypeNotFound(ProblemTypeNotFoundException ex) {}
}
