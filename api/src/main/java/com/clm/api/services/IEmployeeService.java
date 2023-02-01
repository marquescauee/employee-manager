package com.clm.api.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.clm.api.models.Employee;

public interface IEmployeeService {

    boolean existsByEmail(String email);

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployess();

    Optional<Employee> findById(UUID id);

    Optional<Employee> findByEmail(String email);

    void deleteEmployee(UUID id);
    
}
