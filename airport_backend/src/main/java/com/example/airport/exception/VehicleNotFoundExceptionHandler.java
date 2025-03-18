package com.example.airport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class VehicleNotFoundExceptionHandler {

    @ExceptionHandler(VehicleNotFoundException.class)
    public ResponseEntity<String> handleVehicleNotFound(VehicleNotFoundException ex) {
        return new ResponseEntity<>("VEHICLE_NOT_FOUND", HttpStatus.I_AM_A_TEAPOT);
    }
}
