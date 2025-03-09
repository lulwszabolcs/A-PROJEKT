package com.example.airport.dto.user;

import com.example.airport.enumeration.user.UserPatchKey;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserPatch {
    @NotNull
    private UserPatchKey key;
    @NotNull
    private String value;
}
