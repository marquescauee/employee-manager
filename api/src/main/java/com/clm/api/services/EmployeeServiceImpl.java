package com.clm.api.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.clm.api.models.Employee;
import com.clm.api.repositories.IEmployeeRepository;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    private IEmployeeRepository employeeRepository;

    public EmployeeServiceImpl(IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployess() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findById(UUID id) {
        return employeeRepository.findById(id);
    }

    @Override
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
        
    }
    
}
