// src/types/calculator.ts
export type CalculatorRequest = {
	capacidadInstalacionMw: number;
	porcentajeUtilizacion: number;
	tipoEnfriamiento: string;
};

export type CalculatorResponse = {
	id: string;
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
	correo: string;
	creadoEn: string;
};
