package com.clm.api.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clm.api.models.Employee;

public interface IEmployeeRepository extends JpaRepository<Employee, UUID> {

    boolean existsByEmail(String email);
}
