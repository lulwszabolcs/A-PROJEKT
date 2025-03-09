package com.example.airport.enumeration.user;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserStatus {
    ONLINE("User is currently online"),
    OFFLINE("User is currently offline"),
    ON_HOLIDAY("User is currently on holiday");

    private final String description;

    UserStatus(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}