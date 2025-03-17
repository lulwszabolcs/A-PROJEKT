package com.example.airport.dto.problem;

import com.example.airport.enumeration.problem.ProblemStatus;
import com.example.airport.enumeration.problem.ProblemType;
import com.example.airport.enumeration.role.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProblemList {
    private int problemId;
    private String name;
    private String description;
    private String date;
    private ProblemType problemType;
    private ProblemStatus status;
    private Role role;
}
