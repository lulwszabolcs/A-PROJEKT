package com.example.airport.dto.vehicle;

import com.example.airport.enumeration.vehicle.VehicleStatus;
import com.example.airport.enumeration.vehicle.VehicleType;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class VehicleRead {
    private Integer vehicleId;
    private String name;
    private String license;
    private VehicleType type;
    private Integer vehicleYear;
    private VehicleStatus status;
}
