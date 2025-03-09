package com.example.airport.controller;

import com.example.airport.auth.PermissionCollector;
import com.example.airport.enumeration.Permission;
import com.example.airport.enumeration.role.Role;
import com.example.airport.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "Check permissions for role")
public class CheckPermissionController {

    @Autowired
    private UserService service;

    @GetMapping("/check-permission")
    @PreAuthorize("isAuthenticated()")
    @Operation(description = "Check permission for a role")
    public ResponseEntity<Boolean> checkPermission(@RequestParam Permission permission) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        PermissionCollector userDetails = (PermissionCollector) auth.getPrincipal();
        Role userRole = userDetails.getUser().getRole();
        boolean result = service.hasPermission(userRole, permission);
        return ResponseEntity.ok(result);
    }

}
