package com.example.airport.dto.vehicle;

import com.example.airport.enumeration.StatusPatchKey;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehiclePatch {
    @NotNull
    private StatusPatchKey key;
    @NotNull
    private String value;
}
