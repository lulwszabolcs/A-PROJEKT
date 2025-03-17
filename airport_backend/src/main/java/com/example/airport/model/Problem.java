package com.example.airport.model;

import com.example.airport.enumeration.problem.ProblemStatus;
import com.example.airport.enumeration.problem.ProblemType;
import com.example.airport.enumeration.role.Role;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int problemId;
    private String name;
    private String description;
    private String date;
    @Enumerated(EnumType.STRING)
    private ProblemType problemType;
    @Enumerated(EnumType.STRING)
    private ProblemStatus status;
    @Enumerated(EnumType.STRING)
    private Role role;
}
