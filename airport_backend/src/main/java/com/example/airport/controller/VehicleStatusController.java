package com.example.airport.controller;

import com.example.airport.enumeration.vehicle.VehicleStatus;
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
@Tag(name = "Vehicle status operations", description = "Make operations with the vehicle status enumeration")
public class VehicleStatusController {

    @Operation(summary = "List all vehicle status names")
    @GetMapping("/vehiclestatuses/list")
    @PreAuthorize("hasAuthority('LIST_VEHICLE_STATUSES_NAME')")
    public ResponseEntity<List<VehicleStatusRead>> getAllVehicleStatuses() {
        List<VehicleStatus> allStatuses = Arrays.asList(VehicleStatus.values());
        List<VehicleStatusRead> dtos = allStatuses.stream()
                .map(status -> new VehicleStatusRead(status.name(), status.getDescription()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}

@Getter
class VehicleStatusRead {
    private String vehicleStatusName;
    private String vehicleStatusDescription;

    public VehicleStatusRead(String vehicleStatusName, String vehicleStatusDescription) {
        this.vehicleStatusName = vehicleStatusName;
        this.vehicleStatusDescription = vehicleStatusDescription;
    }
}
