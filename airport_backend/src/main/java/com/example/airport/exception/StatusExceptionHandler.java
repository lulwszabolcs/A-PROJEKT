package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class StatusExceptionHandler {
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "STATUS_NOT_FOUND")
    @ExceptionHandler(value = StatusNotFoundException.class)
    public void handleStatusNotFound(StatusNotFoundException ex) {

    }
}
