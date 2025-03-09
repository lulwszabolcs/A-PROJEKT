package com.example.airport.repository;

import com.example.airport.model.Allocate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AllocateRepository extends JpaRepository<Allocate, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT CASE WHEN EXISTS" +
                    "(SELECT 1 FROM allocate WHERE role_id = :role " +
                    "AND permission_id = :permission) THEN 1 ELSE 0 END")
    Long hasPermission(@Param("role") String role, @Param("permission") String permission);
}
