package com.physaflow.calculator.dto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Set;

public class CorporateEmailValidator implements ConstraintValidator<CorporateEmail, String> {

    private static final Set<String> FREE_EMAIL_DOMAINS = Set.of(
            "gmail.com",
            "hotmail.com",
            "yahoo.com",
            "outlook.com",
            "live.com"
    );

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.isBlank() || !email.contains("@")) {
            return true;
        }

        String dominio = email.substring(email.indexOf("@") + 1).toLowerCase();

        return !FREE_EMAIL_DOMAINS.contains(dominio);
    }
}