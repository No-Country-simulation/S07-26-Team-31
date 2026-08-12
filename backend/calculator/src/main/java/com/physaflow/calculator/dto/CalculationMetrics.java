package com.physaflow.calculator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class CalculationMetrics {
    private String tipoEnfriamiento;
    private double porcentajeUtilizacion;
    private double itCapacityMw;
    private double workloadMw;
    private double strandedMw;
    private double strandedPercent;
    private double perdidaMinima;
    private double perdidaMaxima;
    private double pue;
    private double pueDelta;
    private double utilizacionIt;
    private double costoCarbono;
    private double comparacionIndustria;
    private String estadoSalud;
    private double fugaTermicaMw;
    private double servidoresZombiMw;
    private double sobrecostoRedundanciaMw;
}