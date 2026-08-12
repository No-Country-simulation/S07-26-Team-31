package com.physaflow.calculator.service;

import com.physaflow.calculator.dto.*;
import com.physaflow.calculator.dto.mapper.CalculationMapper;
import com.physaflow.calculator.exception.ResourceNotFoundException;
import com.physaflow.calculator.model.Calculo;
import com.physaflow.calculator.model.CalculoOptimizado;
import com.physaflow.calculator.repository.CalculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalculationService {

    private final CalculoRepository calculoRepository;
    private final CalculationMapper calculationMapper;
    private final EmailService emailService;
    private final PdfService pdfService;
    private static final SecureRandom RANDOM = new SecureRandom();

    // Precio promedio por MWh (ajustable, es un estimado representativo)
    private static final double COSTO_POR_MWH = 75.0; // USD
    private static final double HORAS_ANIO = 8760.0;

    // Constantes para nuevas métricas
    private static final double BENCHMARK_PUE = 1.5;
    private static final double BENCHMARK_STRANDED_PCT = 28.0;
    private static final double OVERHEAD_BASE = 0.20;
    private static final double FACTOR_CARBONO = 0.02; // USD/kWh combinado

    @Transactional
    public CalculationResponse calcularYGuardar(CalculationRequest request) {
        // 1. Calculo Actual
        String enfriamientoActual = request.getTipoEnfriamiento();
        double utilizacionActual = request.getPorcentajeUtilizacion();
        double capacidadActual = request.getCapacidadInstalacionMw();

        CalculationMetrics actual = calcularMetricas(
                capacidadActual,
                enfriamientoActual,
                utilizacionActual
        );

        // 2. Calculo Optimizado Alto
        String enfriamientoOptimizado = switch (enfriamientoActual) {
            case "aire" -> "liquido";
            case "gratuito", "inmersion" -> enfriamientoActual;
            default -> "inmersion";  // "hibrido", "liquido"
        };

        double utilizacionOptimizada;
        if (utilizacionActual >= 95.0) {
            utilizacionOptimizada = utilizacionActual;
        } else if (utilizacionActual >= 85.0) {
            utilizacionOptimizada = Math.min(95.0, utilizacionActual + 5.0);
        } else if (utilizacionActual >= 60.0) {
            utilizacionOptimizada = 85.0;
        } else {
            utilizacionOptimizada = 70.0;
        }

        CalculationMetrics optimizado = calcularMetricas(
                capacidadActual,
                enfriamientoOptimizado,
                utilizacionOptimizada
        );

        // 3. Generar token único
        String token = generarToken();

        // 4. Guardar entidades
        CalculoOptimizado calculoOptimizado = CalculoOptimizado.builder()
                .capacidadInstalacionMw(capacidadActual)
                .porcentajeUtilizacion(optimizado.getPorcentajeUtilizacion())
                .tipoEnfriamiento(optimizado.getTipoEnfriamiento())
                .porcentajeCapacidadDesperdiciada(Math.round(optimizado.getStrandedPercent() * 100.0) / 100.0)
                .capacidadDesperdiciadaMw(Math.round(optimizado.getStrandedMw() * 100.0) / 100.0)
                .perdidaAnualMinima(optimizado.getPerdidaMinima())
                .perdidaAnualMaxima(optimizado.getPerdidaMaxima())
                .pue(optimizado.getPue())
                .pueDelta(optimizado.getPueDelta())
                .utilizacionIt(optimizado.getUtilizacionIt())
                .costoCarbonoAnual(optimizado.getCostoCarbono())
                .estadoSalud(optimizado.getEstadoSalud())
                .comparacionIndustria(optimizado.getComparacionIndustria())
                .fugaTermicaMw(optimizado.getFugaTermicaMw())
                .servidoresZombiMw(optimizado.getServidoresZombiMw())
                .sobrecostoRedundanciaMw(optimizado.getSobrecostoRedundanciaMw())
                .build();

        Calculo calculo = Calculo.builder()
                .capacidadInstalacionMw(capacidadActual)
                .porcentajeUtilizacion(utilizacionActual)
                .tipoEnfriamiento(enfriamientoActual)
                .capacidadDesperdiciadaMw(Math.round(actual.getStrandedMw() * 100.0) / 100.0)
                .porcentajeCapacidadDesperdiciada(Math.round(actual.getStrandedPercent() * 100.0) / 100.0)
                .perdidaAnualMinima(actual.getPerdidaMinima())
                .perdidaAnualMaxima(actual.getPerdidaMaxima())
                .pue(actual.getPue())
                .pueDelta(actual.getPueDelta())
                .utilizacionIt(actual.getUtilizacionIt())
                .costoCarbonoAnual(actual.getCostoCarbono())
                .estadoSalud(actual.getEstadoSalud())
                .comparacionIndustria(actual.getComparacionIndustria())
                .fugaTermicaMw(actual.getFugaTermicaMw())
                .servidoresZombiMw(actual.getServidoresZombiMw())
                .sobrecostoRedundanciaMw(actual.getSobrecostoRedundanciaMw())
                .tokenCompartido(token)
                .build();

        calculo.setCalculoOptimizado(calculoOptimizado);

        calculo = calculoRepository.save(calculo);

        // 5. Devolver DTO de respuesta
        return calculationMapper.toResponse(calculo);
    }

    @Transactional(readOnly = true)
    public CalculationResponse obtenerPorToken(String token) {
        return calculoRepository.findByTokenCompartido(token)
                .map(calculationMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró ningún cálculo con el token: " + token));
    }

    @Transactional
    public CalculationResponse actualizarCorreo(String token, String correo) {
        Calculo calculo = calculoRepository.findByTokenCompartido(token)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró ningún cálculo con el token: " + token));

        if (calculo.getCorreo() != null && !calculo.getCorreo().isBlank()) {
            throw new IllegalArgumentException("Este cálculo ya tiene un correo asociado.");
        }

        calculo.setCorreo(correo);
        calculoRepository.save(calculo);
        emailService.sendCalculationEmail(correo, calculo.getTokenCompartido());

        return calculationMapper.toResponse(calculo);
    }

    @Transactional
    public ReportResponse generarReporte(String token, String correo) {
        /* Actualizar correo del calculo */
        Calculo calculo = calculoRepository.findByTokenCompartido(token)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró ningún cálculo con el token: " + token));
        if (calculo.getCorreo() != null && !calculo.getCorreo().isBlank()) {
            throw new IllegalArgumentException("Este cálculo ya tiene un correo y reporte asociado");
        }
        CalculoOptimizado calculoOptimizado =  calculo.getCalculoOptimizado();

        calculo.setCorreo(correo);
        calculoRepository.save(calculo);

        /* Generar Reporte Completo */
        // Comparar Escenarios
        ComparisonResponse comparacion = compararMetricas(calculo, calculoOptimizado);
        // Descarga PDF
        String nombrePdf = pdfService.generarPdf(calculo, calculoOptimizado, comparacion);
        // Enviar mail
        emailService.sendCalculationEmail(correo, calculo.getTokenCompartido());

        // Devolver Reporte
        return ReportResponse.builder()
                .calculoActual(calculationMapper.toResponse(calculo))
                .calculoOptimizado(calculationMapper.toResponseFromOptimized(calculoOptimizado))
                .nombrePdf(nombrePdf)
                .comparacion(comparacion)
                .build();
    }

    private ComparisonResponse compararMetricas(Calculo actual, CalculoOptimizado optimizado) {
        double ahorroAnualMinimo = actual.getPerdidaAnualMinima() - optimizado.getPerdidaAnualMinima();
        double ahorroAnualMaximo = actual.getPerdidaAnualMaxima() - optimizado.getPerdidaAnualMaxima();
        double reduccionCapacidadDesperdiciadaMw = actual.getCapacidadDesperdiciadaMw() - optimizado.getCapacidadDesperdiciadaMw();
        double reduccionCapacidadDesperdiciadaPorcentaje = actual.getPorcentajeCapacidadDesperdiciada() - optimizado.getPorcentajeCapacidadDesperdiciada();
        double mejoraPue = actual.getPue() - optimizado.getPue();
        double mejoraUtilizacionIt = optimizado.getUtilizacionIt() - actual.getUtilizacionIt();
        double reduccionCostoCarbono = actual.getCostoCarbonoAnual() - optimizado.getCostoCarbonoAnual();
        double mejoraFugaTermicaMw = actual.getFugaTermicaMw() - optimizado.getFugaTermicaMw();
        double reduccionServidoresZombiMw = actual.getServidoresZombiMw() - optimizado.getServidoresZombiMw();
        double reduccionSobrecostoRedundancia = actual.getSobrecostoRedundanciaMw() - optimizado.getSobrecostoRedundanciaMw();

        return ComparisonResponse.builder()
                .ahorroAnualMinimo(ahorroAnualMinimo)
                .ahorroAnualMaximo(ahorroAnualMaximo)
                .reduccionCapacidadDesperdiciadaMw(reduccionCapacidadDesperdiciadaMw)
                .reduccionCapacidadDesperdiciadaPorcentaje(reduccionCapacidadDesperdiciadaPorcentaje)
                .mejoraPue(mejoraPue)
                .mejoraUtilizacionIt(mejoraUtilizacionIt)
                .reduccionCostoCarbono(reduccionCostoCarbono)
                .mejoraFugaTermicaMw(mejoraFugaTermicaMw)
                .reduccionServidoresZombiMw(reduccionServidoresZombiMw)
                .reduccionSobrecostoRedundanciaMw(reduccionSobrecostoRedundancia)
                .mejoraEstadoSalud(
                        obtenerMejoraEstadoSalud(
                                actual.getEstadoSalud(),
                                optimizado.getEstadoSalud()
                        )
                )
                .build();
    }

    private String obtenerMejoraEstadoSalud(String actual, String optimizado) {
        if (actual.equals(optimizado)) {
            return "NO_CHANGE";
        }

        return switch (actual) {
            case "CRITICAL" -> "GOOD".equals(optimizado) ? "SIGNIFICANT_IMPROVEMENT" : "IMPROVED";
            case "WARNING" -> "GOOD".equals(optimizado) ? "IMPROVED" : "WORSENED";
            default -> "WORSENED";
        };
    }

    private CalculationMetrics calcularMetricas(double capacidadMw, String tipoEnfriamiento, double porcentajeUtilizacion) {
        // 1. Factor de Cooling
        double factorCooling = switch (tipoEnfriamiento.toLowerCase()) {
            case "aire" -> 0.65;
            case "liquido" -> 0.85;
            case "gratuito", "inmersion" -> 0.95;
            case "hibrido" -> 0.80;
            default -> throw new IllegalArgumentException("Tipo de enfriamiento no válido: " + tipoEnfriamiento);
        };

        // 2. Capacidades y Workload
        double itCapacityMw = capacidadMw * factorCooling;
        double workloadMw = itCapacityMw * (porcentajeUtilizacion / 100.0);

        // 3. Stranded
        double strandedMw = capacidadMw - workloadMw;
        double strandedPercent = (strandedMw / capacidadMw) * 100.0;

        // 4. Pérdidas financieras y PUE
        double perdidaBase = strandedMw * COSTO_POR_MWH * HORAS_ANIO;
        double perdidaMinima = Math.round(perdidaBase * 0.8 * 100.0) / 100.0;
        double perdidaMaxima = Math.round(perdidaBase * 1.2 * 100.0) / 100.0;

        double pue = Math.round((1.0 + OVERHEAD_BASE + (1.0 / factorCooling - 1.0)) * 100.0) / 100.0;
        double pueDelta = Math.round((pue - BENCHMARK_PUE) * 100.0) / 100.0;
        double utilizacionIt = Math.round((workloadMw / itCapacityMw) * 1000.0) / 10.0;
        double costoCarbono = Math.round(strandedMw * HORAS_ANIO * 1000 * FACTOR_CARBONO * 100.0) / 100.0;
        double comparacionIndustria = Math.round((strandedPercent - BENCHMARK_STRANDED_PCT) * 10.0) / 10.0;

        // 5. Estado de Salud
        String estadoSalud;
        if (strandedPercent > 40.0 || pue > 2.0) {
            estadoSalud = "CRITICAL";
        } else if (strandedPercent > 25.0 || pue > 1.6) {
            estadoSalud = "WARNING";
        } else {
            estadoSalud = "GOOD";
        }

        // 6. Desglose de Pérdidas Físicas
        double fugaTermicaMw = Math.round(strandedMw * 0.35 * 100.0) / 100.0;
        double servidoresZombiMw = Math.round(strandedMw * 0.40 * 100.0) / 100.0;
        double sobrecostoRedundanciaMw = Math.round(strandedMw * 0.25 * 100.0) / 100.0;

        return CalculationMetrics.builder()
                .tipoEnfriamiento(tipoEnfriamiento)
                .porcentajeUtilizacion(porcentajeUtilizacion)
                .itCapacityMw(itCapacityMw)
                .workloadMw(workloadMw)
                .strandedMw(strandedMw)
                .strandedPercent(strandedPercent)
                .perdidaMinima(perdidaMinima)
                .perdidaMaxima(perdidaMaxima)
                .pue(pue)
                .pueDelta(pueDelta)
                .utilizacionIt(utilizacionIt)
                .costoCarbono(costoCarbono)
                .comparacionIndustria(comparacionIndustria)
                .estadoSalud(estadoSalud)
                .fugaTermicaMw(fugaTermicaMw)
                .servidoresZombiMw(servidoresZombiMw)
                .sobrecostoRedundanciaMw(sobrecostoRedundanciaMw)
                .build();
    }

    private String generarToken() {
        byte[] bytes = new byte[24];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

}