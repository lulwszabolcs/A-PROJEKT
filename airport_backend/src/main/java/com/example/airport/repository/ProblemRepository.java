package com.example.airport.repository;

import com.example.airport.enumeration.problem.ProblemType;
import com.example.airport.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {

    List<Problem> findByProblemType(ProblemType problemType);
}
