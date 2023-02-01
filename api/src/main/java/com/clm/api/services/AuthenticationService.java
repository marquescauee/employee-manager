package com.clm.api.services;

import com.clm.api.models.Employee;
import com.clm.api.models.Role;
import com.clm.api.repositories.IEmployeeRepository;
import com.clm.api.request.AuthenticationRequest;
import com.clm.api.request.RegisterRequest;
import com.clm.api.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final IEmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Role role = Role.EMPLOYEE;

        if(request.getRole().equals("ADMIN")) {
            role = Role.ADMIN;
        }

        Employee employee = Employee.builder()
                            .firstName(request.getFirstName())
                            .lastName(request.getLastName())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .role(role)
                            .build();

        employeeRepository.save(employee);
        var jwtToken = jwtService.generateToken(employee);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(employee);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
