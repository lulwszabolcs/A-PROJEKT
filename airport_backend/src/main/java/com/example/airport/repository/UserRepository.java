package com.example.airport.repository;

import com.example.airport.enumeration.user.UserStatus;
import com.example.airport.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findUsersByStatus(UserStatus userStatus);

    User findUserByUsername(String username);

    @Query(nativeQuery = true, value = "SELECT a.permission_id FROM allocate a WHERE a.role_id = :role")
    List<String> findPermissionsByRole(@Param("role") String role);
}
