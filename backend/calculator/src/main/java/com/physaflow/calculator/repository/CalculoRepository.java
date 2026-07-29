package com.physaflow.calculator.repository;

import com.physaflow.calculator.model.Calculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface CalculoRepository extends JpaRepository<Calculo, UUID> {
    Optional<Calculo> findByTokenCompartido(String tokenCompartido);
    // Si necesitás listar por correo: List<Calculo> findByCorreo(String correo);
}