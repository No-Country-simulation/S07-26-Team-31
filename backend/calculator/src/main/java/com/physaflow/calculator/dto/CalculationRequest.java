package com.physaflow.calculator.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculationRequest {

    @NotNull @Positive
    private Double capacidadInstalacionMw;

    @NotNull @DecimalMin("0.0") @DecimalMax("100.0")
    private Double porcentajeUtilizacion;

    @NotBlank
    private String tipoEnfriamiento;  // "aire", "liquido", "gratuito"
}