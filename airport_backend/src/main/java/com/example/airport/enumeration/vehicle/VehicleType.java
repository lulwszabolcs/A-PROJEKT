package com.example.airport.enumeration.vehicle;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.JoinColumn;

public enum VehicleType {
    // Repülőgépek
    AIRCRAFT("Repülőgép"),
    HELICOPTER("Helikopter"),

    // Talajszolgálati járművek
    PUSHBACK_TRUCK("Tolató traktor"),
    TUG("Vontató"),
    FUEL_TRUCK("Üzemanyag-szállító"),
    FOOD_SERVICE_TRUCK("Étel kiszolgáló jármű"),
    BELT_LOADER("Szállítószalag"),
    DEICING_TRUCK("Jégtelenítő"),
    FIRE_TRUCK("Tűzoltóautó"),

    // Utas szállító járművek
    SHUTTLE_BUS("Busz"),
    MOBILE_LOUNGE("Mobil váróterem"),
    AMBULIFT("Emelőkocsi"),

    // Egyéb járművek
    MAINTENANCE_TRUCK("Karbantartó jármű"),
    SECURITY_VEHICLE("Biztonsági jármű"),
    AIRFIELD_SWEEPER("Pályatakarító");

    @JoinColumn(name = "description")
    private final String description;

    VehicleType(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

}

