package com.example.airport.enumeration.vehicle;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.JoinColumn;

public enum VehicleStatus {
    OPERATIONAL("Jármű működőképes"),
    UNDER_MAINTENANCE("Karbantartás alatt"),
    IN_REPAIR("Javítás alatt"),
    OUT_OF_SERVICE("Üzemen kívül"),
    AWAITING_INSPECTION("Várakozik a szemlére"),
    FUELING("Tankolás alatt"),
    CLEANING("Tisztítás alatt"),
    UNDER_INSPECTION("Szemlén van");

    @JoinColumn(name = "description")
    private final String description;

    VehicleStatus(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}