package com.example.airport.dto.problem;

import com.example.airport.enumeration.problem.ProblemPatchKey;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProblemPatch {
    @NotNull
    private ProblemPatchKey key;
    @NotNull
    private String value;
}
