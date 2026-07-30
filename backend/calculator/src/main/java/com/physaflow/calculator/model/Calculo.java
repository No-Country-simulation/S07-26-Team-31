package com.physaflow.calculator.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "calculos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calculo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "token_compartido", unique = true, nullable = false)
    private String tokenCompartido;

    @Column(name = "capacidad_instalacion_mw", nullable = false)
    private double capacidadInstalacionMw;

    @Column(name = "porcentaje_utilizacion", nullable = false)
    private double porcentajeUtilizacion;

    @Column(name = "tipo_enfriamiento", nullable = false)
    private String tipoEnfriamiento;   // "aire", "liquido", "gratuito"

    @Column(name = "porcentaje_capacidad_desperdiciada")
    private double porcentajeCapacidadDesperdiciada;

    @Column(name = "capacidad_desperdiciada_mw")
    private double capacidadDesperdiciadaMw;

    @Column(name = "perdida_anual_minima")
    private double perdidaAnualMinima;

    @Column(name = "perdida_anual_maxima")
    private double perdidaAnualMaxima;

    @Column(name = "pue")
    private double pue;

    @Column(name = "pue_delta")
    private double pueDelta;

    @Column(name = "utilizacion_it")
    private double utilizacionIt;

    @Column(name = "costo_carbono_anual")
    private double costoCarbonoAnual;

    @Column(name = "estado_salud")
    private String estadoSalud;

    @Column(name = "comparacion_industria")
    private double comparacionIndustria;

    @Column(name = "fuga_termica_mw")
    private double fugaTermicaMw;

    @Column(name = "servidores_zombi_mw")
    private double servidoresZombiMw;

    @Column(name = "sobrecosto_redundancia_mw")
    private double sobrecostoRedundanciaMw;

    @Column(name = "correo")
    private String correo;

    @Column(name = "creado_en", updatable = false)
    private Instant creadoEn;

    @PrePersist
    protected void onCreate() {
        creadoEn = Instant.now();
    }
}