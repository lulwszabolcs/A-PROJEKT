package com.example.airport.controller;

import com.example.airport.dto.worker.WorkerList;
import com.example.airport.dto.worker.WorkerRead;
import com.example.airport.dto.worker.WorkerSave;
import com.example.airport.service.WorkerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Worker functions", description = "Manage workers")
public class WorkerController {

    @Autowired
    private WorkerService service;

    @GetMapping("/worker/{id}")
    @Operation(summary = "Get worker by id")
    @PreAuthorize("hasAuthority('READ_WORKER')")
    public WorkerRead getWokerById(@PathVariable int id) {
        return service.readWorker(id);
    }

    @GetMapping("/worker/list")
    @Operation(summary = "List workers")
    @PreAuthorize("hasAuthority('LIST_WORKER')")
    public List<WorkerList> listWorkers() {
        return service.listWorkers();
    }

    @PostMapping("/worker/")
    @Operation(summary = "Create new worker")
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('CREATE_WORKER')")
    public WorkerRead createWorker(@Valid @RequestBody WorkerSave workerSave) {
        return service.createWorker(workerSave);
    }

    @PutMapping("/worker/{id}")
    @Operation(summary = "Update worker by id")
    @PreAuthorize("hasAuthority('UPDATE_WORKER')")
    public WorkerRead updateWorker(@PathVariable int id, @Valid @RequestBody WorkerSave workerSave) {
        return service.updateWorker(id, workerSave);
    }

    @DeleteMapping("/worker/{id}")
    @Operation(summary = "Delete worker by id")
    @PreAuthorize("hasAuthority('DELETE_WORKER')")
    public WorkerRead deleteWorker(@PathVariable int id) {
        return service.deleteWorker(id);
    }
}
