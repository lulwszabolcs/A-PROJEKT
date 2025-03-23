package com.example.airport.enumeration.role;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;

public enum Role {
    // Air Traffic and Technical Roles
    AIR_TRAFFIC_CONTROLLER("Légiforgalmi irányító"),
    GROUND_CONTROL_OPERATOR("Földi irányító operátor"),
    NAVIGATION_SYSTEM_TECHNICIAN("Navigációs rendszer technikus"),

    // Ground Handling
    MAINTENANCE_TECHNICIAN("Karbantartó technikus"),
    RAMP_AGENT("Rampa ügynök"),
    BAGGAGE_HANDLER("Poggyászkézbesítő"),
    REFUELING_OPERATOR("Tankoló operátor"),
    JETWAY_OPERATOR("Jetway operátor"),

    // Passenger Services
    CHECK_IN_AGENT("Bejelentkezési ügynök"),
    CUSTOMER_SERVICE_AGENT("Ügyfélszolgálati ügynök"),
    GATE_AGENT("Kapcsolati ügynök"),
    VIP_SERVICE_AGENT("VIP szolgáltatási ügynök"),

    // Security Roles
    SECURITY_SCREENING_OFFICER("Biztonsági ellenőrző tiszt"),
    AIRPORT_SECURITY_GUARD("Repülőtéri biztonsági őr"),
    FIREFIGHTER("Tűzoltó"),

    // Cargo and Logistics
    CARGO_HANDLER("Árukezelő"),
    LOGISTICS_COORDINATOR("Logisztikai koordinátor");

    @JoinColumn(name = "description")
    private final String description;

    Role(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}

