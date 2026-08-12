package com.physaflow.calculator.dto.mapper;

import com.physaflow.calculator.dto.CalculationResponse;
import com.physaflow.calculator.model.Calculo;
import com.physaflow.calculator.model.CalculoOptimizado;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CalculationMapper {

    CalculationResponse toResponse(Calculo calculo);

    CalculationResponse toResponseFromOptimized(CalculoOptimizado calculoOptimizado);
}