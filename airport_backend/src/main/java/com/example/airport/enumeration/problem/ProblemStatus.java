package com.example.airport.enumeration.problem;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.JoinColumn;

public enum ProblemStatus {
    PENDING("Függőben"),
    IN_PROGRESS("Folyamatban"),
    RESOLVED("Megoldva"),
    CLOSED("Lezárva"),
    ON_HOLD("Felfüggesztve"),
    CANCELED("Törölve"),
    FAILED("Sikertelen");

    @JoinColumn(name = "description")
    private final String description;

    ProblemStatus(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}

