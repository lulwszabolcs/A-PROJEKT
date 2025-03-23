package com.example.airport.dto.user;

import com.example.airport.enumeration.StatusPatchKey;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserPatch {
    @NotNull
    private StatusPatchKey key;
    @NotNull
    private String value;
}
