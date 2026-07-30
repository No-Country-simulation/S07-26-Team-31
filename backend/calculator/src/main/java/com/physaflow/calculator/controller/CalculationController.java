package com.physaflow.calculator.controller;

import com.physaflow.calculator.dto.CalculationRequest;
import com.physaflow.calculator.dto.CalculationResponse;
import com.physaflow.calculator.service.CalculationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/calculations")
@RequiredArgsConstructor
public class CalculationController {

    private final CalculationService calculationService;

    @PostMapping
    public ResponseEntity<CalculationResponse> create(@Valid @RequestBody CalculationRequest request) {
        CalculationResponse response = calculationService.calcularYGuardar(request);
        return ResponseEntity
                .created(URI.create("/api/calculations/" + response.getTokenCompartido()))
                .body(response);
    }

    @GetMapping("/{token}")
    public ResponseEntity<CalculationResponse> getByToken(@PathVariable String token) {
        return ResponseEntity.ok(calculationService.obtenerPorToken(token));
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<CalculationResponse> patchEmail(@PathVariable UUID id,
                                                          @RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(calculationService.actualizarCorreo(id, email));
    }
}