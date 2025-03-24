package com.example.airport.dto.user;

import com.example.airport.dto.worker.WorkerRead;
import com.example.airport.enumeration.role.Role;
import com.example.airport.enumeration.user.UserStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserRead {
    private int id;
    private String username;
    private String password;
    private Role role;
    private UserStatus status;
    private WorkerRead worker;
    private String jwtToken;
}
