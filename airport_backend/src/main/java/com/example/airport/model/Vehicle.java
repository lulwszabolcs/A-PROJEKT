package com.example.airport.model;

import com.example.airport.enumeration.vehicle.VehicleStatus;
import com.example.airport.enumeration.vehicle.VehicleType;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vehicleId;
    private String name;
    private String license;
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type")
    private VehicleType type;
    private Integer vehicleYear;
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_status")
    private VehicleStatus status;
}
