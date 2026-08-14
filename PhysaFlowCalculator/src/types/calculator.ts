// types/calculator.ts
export type CalculatorRequest = {
	capacidadInstalacionMw: number;
	porcentajeUtilizacion: number;
	tipoEnfriamiento: string;
};

export type CalculatorResponse = {
	id?: string;
	tokenCompartido: string;
	capacidadInstalacionMw: number;
	porcentajeUtilizacion: number;
	tipoEnfriamiento: string;
	porcentajeCapacidadDesperdiciada: number;
	capacidadDesperdiciadaMw: number;
	perdidaAnualMinima: number;
	perdidaAnualMaxima: number;
	pue: number;
	pueDelta: number;
	utilizacionIt: number;
	costoCarbonoAnual: number;
	estadoSalud: string;
	comparacionIndustria: number;
	fugaTermicaMw: number;
	servidoresZombiMw: number;
	sobrecostoRedundanciaMw: number;
	correo: string | null;
	creadoEn: string;
};

export type ComparisonMetrics = {
	ahorroAnualMinimo: number;
	ahorroAnualMaximo: number;
	reduccionCapacidadDesperdiciadaMw: number;
	reduccionCapacidadDesperdiciadaPorcentaje: number;
	mejoraPue: number;
	mejoraUtilizacionIt: number;
	reduccionCostoCarbono: number;
	mejoraFugaTermicaMw: number;
	reduccionServidoresZombiMw: number;
	reduccionSobrecostoRedundanciaMw: number;
	mejoraEstadoSalud: string;
};

export type CompareResponse = {
	calculoActual: CalculatorResponse;
	calculoOptimizado: CalculatorResponse;
	nombrePdf: string;
	comparacion: ComparisonMetrics;
};
