package com.clm.api.services;

import com.clm.api.models.Employee;

public interface IEmployeeService {

    boolean existsByEmail(String email);

    Employee saveEmployee(Employee employee);
    
}
