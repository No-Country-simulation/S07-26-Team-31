package com.physaflow.calculator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {
    CalculationResponse calculoActual;
    CalculationResponse calculoOptimizado;
    String nombrePdf;
    ComparisonResponse comparacion;
}
