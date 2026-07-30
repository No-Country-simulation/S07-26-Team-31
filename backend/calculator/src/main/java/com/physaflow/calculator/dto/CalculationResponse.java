package com.physaflow.calculator.dto;

import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalculationResponse {
    private UUID id;
    private String tokenCompartido;
    private double capacidadInstalacionMw;
    private double porcentajeUtilizacion;
    private String tipoEnfriamiento;
    private double porcentajeCapacidadDesperdiciada;
    private double capacidadDesperdiciadaMw;
    private double perdidaAnualMinima;
    private double perdidaAnualMaxima;
    private double pue;
    private double pueDelta;
    private double utilizacionIt;
    private double costoCarbonoAnual;
    private String estadoSalud;
    private double comparacionIndustria;
    private double fugaTermicaMw;
    private double servidoresZombiMw;
    private double sobrecostoRedundanciaMw;
    private String correo;
    private Instant creadoEn;
}