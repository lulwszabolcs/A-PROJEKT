package com.example.airport.repository;

import com.example.airport.enumeration.role.Role;
import com.example.airport.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    List<Worker> findByTitle(Role title);
}
