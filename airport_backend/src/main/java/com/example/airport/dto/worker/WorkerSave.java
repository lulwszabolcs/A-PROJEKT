package com.example.airport.dto.worker;

import com.example.airport.enumeration.role.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WorkerSave {
    private String name;
    private Role title;
    private String phoneNumber;
    private String email;
    private Integer wage;
}
