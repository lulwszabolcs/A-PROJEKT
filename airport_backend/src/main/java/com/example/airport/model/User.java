package com.example.airport.model;

import com.example.airport.enumeration.role.Role;
import com.example.airport.enumeration.user.UserStatus;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_id")
    private Role role;
    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;
}
