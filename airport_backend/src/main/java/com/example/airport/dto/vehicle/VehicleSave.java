package com.example.airport.dto.vehicle;

import com.example.airport.enumeration.vehicle.VehicleType;
import com.example.airport.enumeration.vehicle.VehicleStatus;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class VehicleSave {
    private String name;
    private VehicleType type;
    private Integer vehicleYear;
    private VehicleStatus status;
}
