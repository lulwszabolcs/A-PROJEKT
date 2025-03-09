package com.example.airport.exception;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.airport.dto.ExceptionResponse;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Hidden
@RestControllerAdvice
public class AuthUserNotFoundExceptionHandler implements ErrorController {

        private ResponseEntity<ExceptionResponse> createHttpResponse(HttpStatus httpStatus, String message) {
            return new ResponseEntity<>(new ExceptionResponse(httpStatus.value(), httpStatus,
                    httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus);
        }

        @ExceptionHandler(AuthUserNotFoundException.class)
        public ResponseEntity<ExceptionResponse> authUserNotFoundException(AuthUserNotFoundException exception) {
            return createHttpResponse(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ExceptionResponse> badCredentialsException() {
            return createHttpResponse(HttpStatus.BAD_REQUEST, "Username / password incorrect. Please try again");
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ExceptionResponse> accessDeniedException() {
            return createHttpResponse(HttpStatus.FORBIDDEN, "You do not have enough permission");
        }

        @ExceptionHandler(TokenExpiredException.class)
        public ResponseEntity<ExceptionResponse> tokenExpiredException(TokenExpiredException exception) {
            return createHttpResponse(HttpStatus.UNAUTHORIZED, exception.getMessage());
        }
    }
