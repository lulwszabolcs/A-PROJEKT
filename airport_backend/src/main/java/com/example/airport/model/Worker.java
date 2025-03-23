package com.example.airport.model;

import com.example.airport.enumeration.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "workers")
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "worker_id")
    private Integer workerId;
    @Column(name = "worker_name")
    private String name;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "worker_title")
    private Role title;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String email;
    @NotNull
    private Integer wage;
}
