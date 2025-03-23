package com.example.airport.dto.problem;

import com.example.airport.enumeration.problem.ProblemStatus;
import com.example.airport.enumeration.problem.ProblemType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProblemSave {
    private String name;
    private String description;
    private String date;
    private ProblemType problemType;
    private ProblemStatus status;
}
