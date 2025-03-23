package com.example.airport.controller;

import com.example.airport.enumeration.role.Role;
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
@Tag(name = "Role operations", description = "Make operations with the role enumeration")
public class RoleController {

    @Operation(summary = "List all role names")
    @GetMapping("/roles/list")
    @PreAuthorize("hasAuthority('LIST_ROLES_NAME')")
    public ResponseEntity<List<RoleRead>> getAllRoles() {
        List<Role> allRoles = Arrays.asList(Role.values());
        List<RoleRead> dtos = allRoles.stream()
                .map(role -> new RoleRead(role.name(), role.getDescription()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}

@Getter
class RoleRead {
    private String roleName;
    private String roleDescription;

    public RoleRead(String roleName, String roleDescription) {
        this.roleName = roleName;
        this.roleDescription = roleDescription;
    }
}
