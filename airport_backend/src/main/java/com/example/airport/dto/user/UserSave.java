package com.example.airport.dto.user;

import com.example.airport.enumeration.role.Role;
import com.example.airport.enumeration.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserSave {
    private String username;
    private String password;
    private Role role;
    private UserStatus status;
    private int worker_id;
}
