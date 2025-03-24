package com.example.airport.controller;

import com.example.airport.enumeration.problem.ProblemType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Tag(name = "Problem type operations", description = "Make operations with the problem types enumeration")
public class ProblemTypeController {

    @Operation(summary = "List all problem type names")
    @GetMapping("/problemtypes/list")
    @PreAuthorize("hasAuthority('LIST_PROBLEM_TYPES_NAME')")
    public ResponseEntity<List<ProblemTypeRead>> getAllProblems() {
        List<ProblemType> allTypes = Arrays.asList(ProblemType.values());
        List<ProblemTypeRead> dtos = allTypes.stream()
                .map(type -> new ProblemTypeRead(type.name(), type.getDescription()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
 @Getter
 class ProblemTypeRead {
    private String problemTypeName;
    private String problemTypeDescription;

    public ProblemTypeRead(String problemTypeName, String problemTypeDescription) {
        this.problemTypeName = problemTypeName;
        this.problemTypeDescription = problemTypeDescription;
    }

}