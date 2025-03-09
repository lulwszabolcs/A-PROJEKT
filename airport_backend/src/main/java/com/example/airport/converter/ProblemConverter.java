package com.example.airport.converter;

import com.example.airport.dto.problem.ProblemList;
import com.example.airport.dto.problem.ProblemRead;
import com.example.airport.dto.problem.ProblemSave;
import com.example.airport.enumeration.role.Role;
import com.example.airport.model.Problem;

import java.util.ArrayList;
import java.util.List;

public class ProblemConverter {
    public static Problem convertModelToSave(ProblemSave problemSave, Role role) {
        Problem problem = new Problem();
        problem.setName(problemSave.getName());
        problem.setDescription(problemSave.getDescription());
        problem.setDatum(problemSave.getDatum());
        problem.setProblemType(problemSave.getProblemType());
        problem.setStatus(problemSave.getStatus());
        problem.setRole(role);
        return problem;
    }

    public static ProblemRead convertModelToRead(Problem problem) {
        ProblemRead problemRead = new ProblemRead();
        problemRead.setProblemId(problem.getProblemId());
        problemRead.setName(problem.getName());
        problemRead.setDescription(problem.getDescription());
        problemRead.setDatum(problem.getDatum());
        problemRead.setProblemType(problem.getProblemType());
        problemRead.setStatus(problem.getStatus());
        problemRead.setRole(problem.getRole());
        return problemRead;
    }

    public static Problem convertModelToSave(Integer id, ProblemSave problemSave, Role role) {
        Problem problem = new Problem();
        problem.setProblemId(id);
        problem.setName(problemSave.getName());
        problem.setDescription(problemSave.getDescription());
        problem.setDatum(problemSave.getDatum());
        problem.setProblemType(problemSave.getProblemType());
        problem.setStatus(problemSave.getStatus());
        problem.setRole(role);
        return problem;
    }

    public static List<ProblemList> convertModelsToList(List<Problem> problems) {
        List<ProblemList> dtoProblems = new ArrayList<>();
        for (Problem problem : problems) {
            dtoProblems.add(convertModelToList(problem));
        }
        return dtoProblems;
    }
    private static ProblemList convertModelToList(Problem problem) {
        ProblemList problemList = new ProblemList();
        problemList.setProblemId(problem.getProblemId());
        problemList.setName(problem.getName());
        problemList.setDescription(problem.getDescription());
        problemList.setDatum(problem.getDatum());
        problemList.setProblemType(problem.getProblemType());
        problemList.setStatus(problem.getStatus());
        problemList.setRole(problem.getRole());
        return problemList;
    }
}
