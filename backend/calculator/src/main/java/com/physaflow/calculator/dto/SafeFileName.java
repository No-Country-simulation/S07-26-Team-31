package com.physaflow.calculator.dto;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = SafeFileNameValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface SafeFileName {
    String message() default "Nombre de archivo inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}