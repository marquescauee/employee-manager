package com.clm.api.services;

import java.util.List;

import com.clm.api.models.Employee;

public interface IEmployeeService {

    boolean existsByEmail(String email);

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployess();
    
}
