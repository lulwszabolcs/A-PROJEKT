package com.example.airport.dto.problem;

import com.example.airport.enumeration.problem.ProblemStatus;
import com.example.airport.enumeration.problem.ProblemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProblemSave {
    private String name;
    private String description;
    private String datum;
    private ProblemType problemType;
    private ProblemStatus status;
    //private Role role;
}
