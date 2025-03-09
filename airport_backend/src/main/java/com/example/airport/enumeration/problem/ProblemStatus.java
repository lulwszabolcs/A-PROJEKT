package com.example.airport.enumeration.problem;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.JoinColumn;


public enum ProblemStatus {
    PENDING("Függőben"),        // Függőben
    IN_PROGRESS("Folyamatban"),    // Folyamatban
    RESOLVED("Megoldva"),       // Megoldva
    CLOSED("Lezárva"),         // Lezárva
    ON_HOLD("Felfüggesztve"),        // Felfüggesztve
    CANCELED("Törölve"),       // Törölve
    FAILED("Sikertelen");          // Sikertelen

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

