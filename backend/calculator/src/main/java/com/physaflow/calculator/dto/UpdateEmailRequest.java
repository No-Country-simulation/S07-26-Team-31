package com.physaflow.calculator.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEmailRequest {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    @CorporateEmail
    private String email;
}