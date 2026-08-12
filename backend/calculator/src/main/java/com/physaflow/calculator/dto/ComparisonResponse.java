package com.physaflow.calculator.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComparisonResponse {
    private double ahorroAnualMinimo;
    private double ahorroAnualMaximo;
    private double reduccionCapacidadDesperdiciadaMw;
    private double reduccionCapacidadDesperdiciadaPorcentaje;
    private double mejoraPue;
    private double mejoraUtilizacionIt;
    private double reduccionCostoCarbono;
    private double mejoraFugaTermicaMw;
    private double reduccionServidoresZombiMw;
    private double reduccionSobrecostoRedundanciaMw;
    private String mejoraEstadoSalud;
}
