package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class NoteNotFoundExceptionHandler {
    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseEntity<String> handleNoteNotFound(NoteNotFoundException e) {
        return new ResponseEntity<>("NOTE_NOT_FOUND", HttpStatus.I_AM_A_TEAPOT);
    }
}
