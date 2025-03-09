package com.example.airport.converter;

import com.example.airport.dto.vehicle.VehicleList;
import com.example.airport.dto.vehicle.VehicleRead;
import com.example.airport.dto.vehicle.VehicleSave;
import com.example.airport.model.Vehicle;
import com.example.airport.service.VehicleService;

import java.util.ArrayList;
import java.util.List;

public class VehicleConverter {
    public static VehicleRead convertModelToRead(Vehicle vehicle) {
        VehicleRead vehicleRead = new VehicleRead();
        vehicleRead.setVehicleId(vehicle.getVehicleId());
        vehicleRead.setName(vehicle.getName());
        vehicleRead.setLicense(vehicle.getLicense());
        vehicleRead.setType(vehicle.getType());
        vehicleRead.setVehicleYear(vehicle.getVehicleYear());
        vehicleRead.setStatus(vehicle.getStatus());
        return vehicleRead;
    }

    public static VehicleList convertModelToList(Vehicle vehicle) {
        VehicleList list = new VehicleList();
        list.setVehicleId(vehicle.getVehicleId());
        list.setName(vehicle.getName());
        list.setLicense(vehicle.getLicense());
        list.setType(vehicle.getType());
        list.setVehicleYear(vehicle.getVehicleYear());
        list.setStatus(vehicle.getStatus());
        return list;
    }

    public static List<VehicleList> convertModelsToList(List<Vehicle> vehicles) {
        List<VehicleList> dtos = new ArrayList<>();
        for (Vehicle vehicle : vehicles) {
            dtos.add(convertModelToList(vehicle));
        }
        return dtos;
    }

    public static Vehicle convertSaveToModel(VehicleSave vehicleSave) {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(vehicleSave.getName());
        vehicle.setLicense(VehicleService.generateLicensePlate());
        vehicle.setType(vehicleSave.getType());
        vehicle.setVehicleYear(vehicleSave.getVehicleYear());
        vehicle.setStatus(vehicleSave.getStatus());
        return vehicle;
    }

    public static Vehicle convertSaveToModel(Integer id,VehicleSave vehicleSave) {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleId(id);
        vehicle.setName(vehicleSave.getName());
        vehicle.setType(vehicleSave.getType());
        vehicle.setVehicleYear(vehicleSave.getVehicleYear());
        vehicle.setStatus(vehicleSave.getStatus());
        return vehicle;
    }
}
