package com.physaflow.calculator.dto;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = CorporateEmailValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface CorporateEmail {

    String message() default "Por favor, utilizá un correo corporativo.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}