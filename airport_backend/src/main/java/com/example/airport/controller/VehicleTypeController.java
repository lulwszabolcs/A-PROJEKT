package com.example.airport.controller;

import com.example.airport.enumeration.vehicle.VehicleType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Tag(name = "Vehicle type operations", description = "Make operations with the vehicle types enumeration")
public class VehicleTypeController {
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "List all vehicle type names")
    @GetMapping("/vehicletypes/list")
    @PreAuthorize("hasAuthority('LIST_VEHICLE_TYPES_NAME')")
    public ResponseEntity<List<VehicleTypeRead>> getAllVehicleTypes() {
        List<VehicleType> allTypes = Arrays.asList(VehicleType.values());
        List<VehicleTypeRead> dtos = allTypes.stream()
                .map(type -> new VehicleTypeRead(type.name(), type.getDescription()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}

@Getter
class VehicleTypeRead {
    private String vehicleTypeName;
    private String vehicleTypeDescription;

    public VehicleTypeRead(String vehicleTypeName, String vehicleTypeDescription) {
        this.vehicleTypeName = vehicleTypeName;
        this.vehicleTypeDescription = vehicleTypeDescription;
    }
}
