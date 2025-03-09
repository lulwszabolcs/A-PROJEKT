package com.example.airport.controller;

import com.example.airport.dto.problem.ProblemList;
import com.example.airport.dto.problem.ProblemPatch;
import com.example.airport.dto.problem.ProblemRead;
import com.example.airport.dto.problem.ProblemSave;
import com.example.airport.enumeration.problem.ProblemType;
import com.example.airport.service.ProblemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Problem functions", description = "Manage problems")
public class ProblemController {

    @Autowired
    ProblemService service;

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseStatus(value = HttpStatus.CREATED)
    @Operation(summary = "Create new problem")
    @PostMapping("/problem")
    @PreAuthorize("hasAuthority('CREATE_PROBLEM')")
    public ProblemRead createProblem(@RequestBody ProblemSave problemSave) {
        return service.createProblem(problemSave);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get problem by id")
    @GetMapping("/problem/{id}")
    @PreAuthorize("hasAuthority('READ_PROBLEM')")
    public ProblemRead getProblem(@PathVariable int id) {
        return service.getProblem(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "List all problems")
    @GetMapping("/problem")
    @PreAuthorize("hasAuthority('LIST_PROBLEM')")
    public List<ProblemList> listProblems() {
        return service.listProblems();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Update problem by id")
    @PutMapping("/problem/{id}")
    @PreAuthorize("hasAuthority('UPDATE_PROBLEM')")
    public ProblemRead updateProblem(@PathVariable int id, @RequestBody ProblemSave problemSave) {
        return service.updateProblem(id, problemSave);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Modify the status of problem")
    @PatchMapping("/problem/{id}")
    @PreAuthorize("hasAuthority('MODIFY_PROBLEM_STATUS')")
    public ProblemRead modifyProblem(@PathVariable int id, @RequestBody ProblemPatch problemPatch) {
        return service.modifyProblem(id, problemPatch);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "List problems by type")
    @GetMapping("/problem/type/{problemType}")
    @PreAuthorize("hasAuthority('LIST_PROBLEM_BY_TYPE')")
    public List<ProblemList> listProblemsByType(@PathVariable ProblemType problemType) {
        return service.listProblemsByType(problemType);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Delete problem by id")
    @DeleteMapping("/problem/{id}")
    @PreAuthorize("hasAuthority('DELETE_PROBLEM')")
    public ProblemRead deleteProblem(@PathVariable int id) {
        return service.deleteProblem(id);
    }
}
