package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class WorkerExceptionHandler {

    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "WORKER_NOT_FOUND")
    @ExceptionHandler(WorkerNotFoundException.class)
    public void handleWorkerNotFound(WorkerNotFoundException ex) {}
}
