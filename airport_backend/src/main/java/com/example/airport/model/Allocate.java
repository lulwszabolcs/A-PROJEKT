package com.example.airport.model;


import com.example.airport.enumeration.Permission;
import com.example.airport.enumeration.role.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Allocate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "role_id")
    private Role role;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "permission_id")
    private Permission permission;
}
