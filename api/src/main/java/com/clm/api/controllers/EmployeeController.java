package com.clm.api.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clm.api.dtos.EmployeeDto;
import com.clm.api.models.Employee;
import com.clm.api.models.Role;
import com.clm.api.services.IEmployeeService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/employees")
@RestController
public class EmployeeController {
    
    private final IEmployeeService employeeService;
    private final PasswordEncoder passwordEncoder;

    public EmployeeController(IEmployeeService employeeService, PasswordEncoder passwordEncoder) {
        this.employeeService = employeeService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        List<Employee> sortedEmployees = employeeService.getAllEmployess();

        sortedEmployees.sort((emp1, emp2) -> emp1.getFirstName().toLowerCase().compareTo  (emp2.getFirstName().toLowerCase()));

        return ResponseEntity.status(HttpStatus.OK).body(sortedEmployees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployee(@PathVariable UUID id) {
        Optional<Employee> employeeDB = employeeService.findById(id);

        if(!employeeDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(employeeDB.get());
    }


    @PostMapping
    public ResponseEntity<Object> saveEmployee(@RequestBody @Valid Employee employee) {
        
        if(employeeService.existsByEmail(employee.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email has already been registered!");
        }

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setRole(Role.EMPLOYEE);

//        Employee employee = new Employee();
//        BeanUtils.copyProperties(employeeDto, employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.saveEmployee(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable UUID id, @RequestBody @Valid EmployeeDto employeeDto) {
        Optional<Employee> employeeDB = employeeService.findById(id);

        if(!employeeDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        Employee employee = employeeDB.get();

        employee.setEmail(employeeDto.getEmail());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());

        return ResponseEntity.status(HttpStatus.OK).body(employeeService.saveEmployee(employee));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable UUID id) {
        Optional<Employee> employeeDB = employeeService.findById(id);

        if(!employeeDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        employeeService.deleteEmployee(id);

        return ResponseEntity.status(HttpStatus.OK).body("Employee removed successfully!");
    }


}
