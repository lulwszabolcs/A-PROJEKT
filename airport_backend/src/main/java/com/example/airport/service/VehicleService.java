package com.example.airport.service;

import com.example.airport.converter.VehicleConverter;
import com.example.airport.dto.vehicle.VehicleList;
import com.example.airport.dto.vehicle.VehiclePatch;
import com.example.airport.dto.vehicle.VehicleRead;
import com.example.airport.dto.vehicle.VehicleSave;
import com.example.airport.enumeration.StatusPatchKey;
import com.example.airport.enumeration.vehicle.VehicleStatus;
import com.example.airport.exception.StatusNotFoundException;
import com.example.airport.exception.VehicleNotFoundException;
import com.example.airport.model.Vehicle;
import com.example.airport.repository.VehicleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repository;
    public static String generateLicensePlate() {
        Random random = new Random();

        // Generáljunk 4 nagybetűt
        StringBuilder letters = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            char letter = (char) ('A' + random.nextInt(26)); // A-Z
            letters.append(letter);
        }

        // Generáljunk 3 számjegyet
        StringBuilder numbers = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            int digit = random.nextInt(10); // 0-9
            numbers.append(digit);
        }

        // Összeállítjuk a rendszámot
        return letters.toString() + "-" + numbers.toString();
    }
    public VehicleRead readVehicle(int id) {
        throwVehicleNotFoundException(id);
        Vehicle vehicle = repository.getReferenceById(id);
        return VehicleConverter.convertModelToRead(vehicle);
    }

    public List<VehicleList> listVehicles() {
        List<Vehicle> vehicles = repository.findAll();
        return VehicleConverter.convertModelsToList(vehicles);
    }

    public VehicleRead createVehicle(@Valid VehicleSave vehicleSave) {
        Vehicle vehicle = repository.save(VehicleConverter.convertSaveToModel(vehicleSave));
        return VehicleConverter.convertModelToRead(vehicle);
    }

    public VehicleRead updateVehicle(int id, VehicleSave vehicleSave) {
        throwVehicleNotFoundException(id);
        return VehicleConverter.convertModelToRead(repository.save(VehicleConverter.convertSaveToModel(id, vehicleSave)));
    }

    public VehicleRead deleteVehicle(int id) {
        throwVehicleNotFoundException(id);
        Vehicle vehicle = repository.getReferenceById(id);
        repository.delete(vehicle);
        return VehicleConverter.convertModelToRead(vehicle);
    }

    public VehicleRead modifyVehicleStatus(int id, VehiclePatch vehiclePatch) {
        throwVehicleNotFoundException(id);
        Vehicle vehicle = repository.getReferenceById(id);

        if (vehiclePatch.getKey() == StatusPatchKey.STATUS) {
            try{
                VehicleStatus newStatus = VehicleStatus.valueOf(vehiclePatch.getValue());
                vehicle.setStatus(newStatus);
            }catch (IllegalArgumentException e){
                throw new StatusNotFoundException();
            }
        }

        Vehicle modifiedVehicle = repository.save(vehicle);
        return VehicleConverter.convertModelToRead(modifiedVehicle);
    }


    private void throwVehicleNotFoundException(int id) {
        if (!repository.existsById(id)) {
            throw new VehicleNotFoundException();
        }
    }
}
