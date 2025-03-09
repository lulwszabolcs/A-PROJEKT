package com.example.airport.dto.worker;

import com.example.airport.enumeration.role.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WorkerList {
    private Integer workerId;
    private String name;
    private Role title;
    private String email;
    private String phoneNumber;
    private Integer wage;
}
