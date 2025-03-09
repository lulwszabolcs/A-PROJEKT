package com.example.airport.enumeration.problem;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.JoinColumn;
import lombok.Getter;

@Getter
public enum ProblemType {
    VEHICLE_FAILURE("Járműhiba"),
    EQUIPMENT_FAILURE("Berendezés meghibásodása"),
    FUEL_LEAK("Üzemanyag szivárgás"),
    COMMUNICATION_BREAKDOWN("Kommunikációs hiba"),
    NAVIGATION_ERROR("Navigációs hiba"),
    POWER_OUTAGE("Áramszünet"),
    RUNWAY_OBSTRUCTION("Kifutópálya akadály"),
    WEATHER_DISRUPTION("Időjárási zavar"),
    AIR_TRAFFIC_CONTROL_ERROR("Légi forgalomirányítási hiba"),
    FUEL_SUPPLY_PROBLEM("Üzemanyag ellátási probléma"),
    SYSTEM_FAILURE("Rendszerhiba"),
    BAGGAGE_MISPLACEMENT("Elveszett poggyász"),
    CUSTOMS_DELAY("Vámdelay"),
    LIGHTING_FAILURE("Világítási hiba"),
    CHECK_IN_ERROR("Check-in hiba"),
    BOARDING_DELAY("Beszállási késés"),
    DEICING_PROBLEM("Jégtelenítési probléma"),
    FUEL_TRUCK_DELAY("Üzemanyag teherautó késés"),
    FIRE_ALARM("Tűzriadó"),
    LAVATORY_MALFUNCTION("Mellékhelyiség meghibásodás"),
    TICKETING_ERROR("Jegykezelési hiba"),
    SECURITY_SYSTEM_FAILURE("Biztonsági rendszer hiba"),
    LOST_CHILD("Elveszett gyermek"),
    MEDICAL_EMERGENCY("Orvosi vészhelyzet"),
    RUNWAY_CRACK("Kifutó pálya repedés"),
    SNOW_CLEARANCE_ISSUE("Hóeltakarítási probléma"),
    BIRD_STRIKE("Madárütközés"),
    HEATING_FAILURE("Fűtési hiba"),
    COOLING_FAILURE("Hűtési hiba"),
    RADIO_FAILURE("Rádió meghibásodás"),
    UNAUTHORIZED_PERSONNEL("Illetéktelen személy"),
    RUNWAY_OVERRUN("Kifutó pálya túlfutás"),
    PARKING_SHORTAGE("Parkolóhely hiány"),
    CARGO_SECURITY_BREACH("Rakomány biztonsági rés"),
    BAGGAGE_SCREENING_ERROR("Poggyászátvilágítási hiba"),
    EMERGENCY_EXIT_PROBLEM("Vészkijárat probléma");

    @JoinColumn(name = "description")
    private final String description;

    ProblemType(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

}


