package com.clm.api.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clm.api.dtos.EmployeeDto;
import com.clm.api.models.Employee;
import com.clm.api.services.IEmployeeService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {
    
    private final IEmployeeService employeeService;

    public EmployeeController(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/addEmployee")
    public ResponseEntity<Object> saveEmployee(@RequestBody @Valid EmployeeDto employeeDto) {
        
        if(employeeService.existsByEmail(employeeDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email has already been registered!");
        }

        Employee employee = new Employee();

        BeanUtils.copyProperties(employeeDto, employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.saveEmployee(employee));
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getAllEmployess());
    }
}
