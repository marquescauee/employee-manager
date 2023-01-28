package com.clm.api.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmployeeDto {
    
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;
}
