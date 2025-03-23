package com.example.airport.dto.user;

import com.example.airport.enumeration.role.Role;
import com.example.airport.enumeration.user.UserStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserSave {
    private String username;
    private String password;
    private Role role;
    private UserStatus status;
    private int worker_id;
}
