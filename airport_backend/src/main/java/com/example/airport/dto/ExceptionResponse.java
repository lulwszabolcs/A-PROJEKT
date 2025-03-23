package com.example.airport.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Data
public class ExceptionResponse {
    private Date timestamp;
    private int httpStatusCode;
    private HttpStatus status;
    private String message;
    private String reason;

    public ExceptionResponse(int httpStatusCode, HttpStatus status, String message, String reason) {
        this.timestamp = new Date();
        this.httpStatusCode = httpStatusCode;
        this.status = status;
        this.message = message;
        this.reason = reason;
    }
}