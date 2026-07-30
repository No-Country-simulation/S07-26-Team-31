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

    public CalculationResponse calcularYGuardar(CalculationRequest request) {
        // 1. Calcular IT capacity después del cooling
        double factorCooling = switch (request.getTipoEnfriamiento().toLowerCase()) {
            case "aire" -> 0.65;      // 35% de overhead
            case "liquido" -> 0.85;   // 15% overhead
            case "gratuito" -> 0.95;  // 5% overhead
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

        // 5. Generar token único
        String token = generarToken();

        // 6. Guardar entidad
        Calculo calculo = Calculo.builder()
                .capacidadInstalacionMw(request.getCapacidadInstalacionMw())
                .porcentajeUtilizacion(request.getPorcentajeUtilizacion())
                .tipoEnfriamiento(request.getTipoEnfriamiento())
                .capacidadDesperdiciadaMw(Math.round(strandedMw * 100.0) / 100.0)
                .porcentajeCapacidadDesperdiciada(Math.round(strandedPercent * 100.0) / 100.0)
                .perdidaAnualMinima(perdidaMinima)
                .perdidaAnualMaxima(perdidaMaxima)
                .tokenCompartido(token)
                .build();

        calculo = calculoRepository.save(calculo);

        // 7. Devolver DTO de respuesta
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