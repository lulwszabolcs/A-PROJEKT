package com.example.airport.controller;

import com.example.airport.dto.vehicle.VehicleList;
import com.example.airport.dto.vehicle.VehiclePatch;
import com.example.airport.dto.vehicle.VehicleRead;
import com.example.airport.dto.vehicle.VehicleSave;
import com.example.airport.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Vehicle functions", description = "Manage vehicles")
public class VehicleController {

    @Autowired
    private VehicleService service;

    @GetMapping("/vehicle/{id}")
    @PreAuthorize("hasAuthority('READ_VEHICLE')")
    @Operation(summary = "Get vehicle by id")
    public VehicleRead getVehicleById(@PathVariable int id) {
        return service.readVehicle(id);
    }

    @GetMapping("/vehicle/list")
    @PreAuthorize("hasAuthority('LIST_VEHICLE')")
    @Operation(summary = "List vehicles")
    public ResponseEntity<List<VehicleList>> listVehicles() {
        List<VehicleList> vehicles = service.listVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/vehicle/")
    @PreAuthorize("hasAuthority('CREATE_VEHICLE')")
    @Operation(summary = "Create new vehicle")
    public VehicleRead createVehicle(@Valid @RequestBody VehicleSave vehicleSave) {
        return service.createVehicle(vehicleSave);
    }

    @PutMapping("/vehicle/{id}")
    @PreAuthorize("hasAuthority('UPDATE_VEHICLE')")
    @Operation(summary = "Update vehicle by id")
    public VehicleRead updateVehicle(@PathVariable int id, @Valid @RequestBody VehicleSave vehicleSave) {
        return service.updateVehicle(id, vehicleSave);
    }

    @PatchMapping("/vehicle/{id}")
    @PreAuthorize("hasAuthority('MODIFY_VEHICLE_STATUS')")
    @Operation(summary = "Modifying vehicle status")
    public VehicleRead modifyVehicleStatus(@PathVariable int id, @RequestBody VehiclePatch vehiclePatch) {
        return service.modifyVehicleStatus(id, vehiclePatch);
    }

    @DeleteMapping("/vehicle/{id}")
    @PreAuthorize("hasAuthority('DELETE_VEHICLE')")
    @Operation(summary = "Delete vehicle by id")
    public VehicleRead deleteVehicle(@PathVariable int id) {
        return service.deleteVehicle(id);
    }
}
