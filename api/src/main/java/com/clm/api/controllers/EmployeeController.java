package com.clm.api.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clm.api.dtos.EmployeeDto;
import com.clm.api.models.Employee;
import com.clm.api.services.IEmployeeService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:3000")
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

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {

        List<Employee> sortedEmployees = employeeService.getAllEmployess();

        sortedEmployees.sort((emp1, emp2) -> emp1.getFirstName().toLowerCase().compareTo  (emp2.getFirstName().toLowerCase()));

        return ResponseEntity.status(HttpStatus.OK).body(sortedEmployees);
    }

    @DeleteMapping("employees/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable UUID id) {
        Optional<Employee> employeeDB = employeeService.findById(id);

        if(!employeeDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        employeeService.deleteEmployee(id);

        return ResponseEntity.status(HttpStatus.OK).body("Employee removed successfully!");
    }
}
