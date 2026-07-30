package com.physaflow.calculator.service;

import com.physaflow.calculator.dto.CalculationRequest;
import com.physaflow.calculator.dto.CalculationResponse;
import com.physaflow.calculator.model.Calculo;
import com.physaflow.calculator.repository.CalculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class CalculationService {

    private final CalculoRepository calculoRepository;
    private static final SecureRandom RANDOM = new SecureRandom();

    // Precio promedio por MWh (ajustable, es un estimado representativo)
    private static final double COSTO_POR_MWH = 75.0; // USD
    private static final double HORAS_ANIO = 8760.0;

    // Constantes para nuevas métricas
    private static final double BENCHMARK_PUE = 1.5;
    private static final double BENCHMARK_STRANDED_PCT = 28.0;
    private static final double OVERHEAD_BASE = 0.20;
    private static final double FACTOR_CARBONO = 0.02; // USD/kWh combinado

    public CalculationResponse calcularYGuardar(CalculationRequest request) {
        // 1. Calcular IT capacity después del cooling
        double factorCooling = switch (request.getTipoEnfriamiento().toLowerCase()) {
            case "aire" -> 0.65;      // 35% de overhead
            case "liquido" -> 0.85;   // 15% overhead
            case "gratuito" -> 0.95;  // 5% overhead
            case "inmersion" -> 0.95; // 5% overhead
            case "hibrido" -> 0.80;   // 20% overhead
            default -> throw new IllegalArgumentException("Tipo de enfriamiento no válido");
        };

        double itCapacityMw = request.getCapacidadInstalacionMw() * factorCooling;

        // 2. Workload real utilizado
        double workloadMw = itCapacityMw * (request.getPorcentajeUtilizacion() / 100.0);

        // 3. Capacidad varada (stranded)
        double strandedMw = request.getCapacidadInstalacionMw() - workloadMw;
        double strandedPercent = (strandedMw / request.getCapacidadInstalacionMw()) * 100.0;

        // 4. Pérdida financiera anual (rango bajo/alto)
        double perdidaBase = strandedMw * COSTO_POR_MWH * HORAS_ANIO;
        double perdidaMinima = Math.round(perdidaBase * 0.8 * 100.0) / 100.0;  // -20% margen
        double perdidaMaxima = Math.round(perdidaBase * 1.2 * 100.0) / 100.0;  // +20% margen

        // 5. Nuevas métricas
        double pue = 1.0 + OVERHEAD_BASE + (1.0 / factorCooling - 1.0);
        pue = Math.round(pue * 100.0) / 100.0;

        double pueDelta = Math.round((pue - BENCHMARK_PUE) * 100.0) / 100.0;

        double utilizacionIt = Math.round((workloadMw / itCapacityMw) * 1000.0) / 10.0;

        double costoCarbono = Math.round(strandedMw * HORAS_ANIO * 1000 * FACTOR_CARBONO * 100.0) / 100.0;

        double comparacionIndustria = Math.round((strandedPercent - BENCHMARK_STRANDED_PCT) * 10.0) / 10.0;

        String estadoSalud;
        if (strandedPercent > 40.0 || pue > 2.0) {
            estadoSalud = "CRITICAL";
        } else if (strandedPercent > 25.0 || pue > 1.6) {
            estadoSalud = "WARNING";
        } else {
            estadoSalud = "GOOD";
        }

        double fugaTermicaMw = Math.round(strandedMw * 0.35 * 100.0) / 100.0;
        double servidoresZombiMw = Math.round(strandedMw * 0.40 * 100.0) / 100.0;
        double sobrecostoRedundanciaMw = Math.round(strandedMw * 0.25 * 100.0) / 100.0;

        // 6. Generar token único
        String token = generarToken();

        // 7. Guardar entidad
        Calculo calculo = Calculo.builder()
                .capacidadInstalacionMw(request.getCapacidadInstalacionMw())
                .porcentajeUtilizacion(request.getPorcentajeUtilizacion())
                .tipoEnfriamiento(request.getTipoEnfriamiento())
                .capacidadDesperdiciadaMw(Math.round(strandedMw * 100.0) / 100.0)
                .porcentajeCapacidadDesperdiciada(Math.round(strandedPercent * 100.0) / 100.0)
                .perdidaAnualMinima(perdidaMinima)
                .perdidaAnualMaxima(perdidaMaxima)
                .pue(pue)
                .pueDelta(pueDelta)
                .utilizacionIt(utilizacionIt)
                .costoCarbonoAnual(costoCarbono)
                .estadoSalud(estadoSalud)
                .comparacionIndustria(comparacionIndustria)
                .fugaTermicaMw(fugaTermicaMw)
                .servidoresZombiMw(servidoresZombiMw)
                .sobrecostoRedundanciaMw(sobrecostoRedundanciaMw)
                .tokenCompartido(token)
                .build();

        calculo = calculoRepository.save(calculo);

        // 8. Devolver DTO de respuesta
        return CalculationResponse.builder()
                .id(calculo.getId())
                .tokenCompartido(token)
                .capacidadInstalacionMw(calculo.getCapacidadInstalacionMw())
                .porcentajeUtilizacion(calculo.getPorcentajeUtilizacion())
                .tipoEnfriamiento(calculo.getTipoEnfriamiento())
                .porcentajeCapacidadDesperdiciada(calculo.getPorcentajeCapacidadDesperdiciada())
                .capacidadDesperdiciadaMw(calculo.getCapacidadDesperdiciadaMw())
                .perdidaAnualMinima(calculo.getPerdidaAnualMinima())
                .perdidaAnualMaxima(calculo.getPerdidaAnualMaxima())
                .pue(calculo.getPue())
                .pueDelta(calculo.getPueDelta())
                .utilizacionIt(calculo.getUtilizacionIt())
                .costoCarbonoAnual(calculo.getCostoCarbonoAnual())
                .estadoSalud(calculo.getEstadoSalud())
                .comparacionIndustria(calculo.getComparacionIndustria())
                .fugaTermicaMw(calculo.getFugaTermicaMw())
                .servidoresZombiMw(calculo.getServidoresZombiMw())
                .sobrecostoRedundanciaMw(calculo.getSobrecostoRedundanciaMw())
                .correo(calculo.getCorreo())
                .creadoEn(calculo.getCreadoEn())
                .build();
    }

    public CalculationResponse obtenerPorToken(String token) {
        Calculo calculo = calculoRepository.findByTokenCompartido(token)
                .orElseThrow(() -> new RuntimeException("Cálculo no encontrado"));
        return mapToResponse(calculo);
    }

    public CalculationResponse actualizarCorreo(UUID id, String correo) {
        Calculo calculo = calculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cálculo no encontrado"));
        calculo.setCorreo(correo);
        calculoRepository.save(calculo);
        return mapToResponse(calculo);
    }

    private CalculationResponse mapToResponse(Calculo calculo) {
        return CalculationResponse.builder()
                .id(calculo.getId())
                .tokenCompartido(calculo.getTokenCompartido())
                .capacidadInstalacionMw(calculo.getCapacidadInstalacionMw())
                .porcentajeUtilizacion(calculo.getPorcentajeUtilizacion())
                .tipoEnfriamiento(calculo.getTipoEnfriamiento())
                .porcentajeCapacidadDesperdiciada(calculo.getPorcentajeCapacidadDesperdiciada())
                .capacidadDesperdiciadaMw(calculo.getCapacidadDesperdiciadaMw())
                .perdidaAnualMinima(calculo.getPerdidaAnualMinima())
                .perdidaAnualMaxima(calculo.getPerdidaAnualMaxima())
                .pue(calculo.getPue())
                .pueDelta(calculo.getPueDelta())
                .utilizacionIt(calculo.getUtilizacionIt())
                .costoCarbonoAnual(calculo.getCostoCarbonoAnual())
                .estadoSalud(calculo.getEstadoSalud())
                .comparacionIndustria(calculo.getComparacionIndustria())
                .fugaTermicaMw(calculo.getFugaTermicaMw())
                .servidoresZombiMw(calculo.getServidoresZombiMw())
                .sobrecostoRedundanciaMw(calculo.getSobrecostoRedundanciaMw())
                .correo(calculo.getCorreo())
                .creadoEn(calculo.getCreadoEn())
                .build();
    }

    private String generarToken() {
        byte[] bytes = new byte[24];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}