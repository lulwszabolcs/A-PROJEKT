package com.example.airport.dto.problem;

import com.example.airport.enumeration.StatusPatchKey;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProblemPatch {
    @NotNull
    private StatusPatchKey key;
    @NotNull
    private String value;
}
