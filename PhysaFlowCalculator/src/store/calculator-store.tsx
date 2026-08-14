// store/calculator-store.ts
import { create } from 'zustand';
import { CalculatorResponse, CompareResponse } from '@/types/calculator';

export type CoolingType = 'air' | 'liquid' | 'immersion' | 'hybrid';

export const coolingTypeMap: Record<CoolingType, string> = {
	air: 'aire',
	liquid: 'liquido',
	immersion: 'inmersion',
	hybrid: 'hibrido',
};

export type CalculatorStore = {
	facilitySize: number;
	utilization: number;
	coolingType: CoolingType | null;
	result: CalculatorResponse | null;
	compareResult: CompareResponse | null;
	activeScenario: 'current' | 'optimized';
	isLoading: boolean;
	error: string | null;
	setFacilitySize: (value: number) => void;
	setUtilization: (value: number) => void;
	setCoolingType: (value: CoolingType) => void;
	setResult: (result: CalculatorResponse) => void;
	setCompareResult: (data: CompareResponse) => void;
	setActiveScenario: (scenario: 'current' | 'optimized') => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	reset: () => void;
};

const initialState = {
	facilitySize: 15,
	utilization: 40,
	coolingType: null,
	result: null,
	compareResult: null,
	activeScenario: 'current' as const,
	isLoading: false,
	error: null,
};

export const useCalculatorStore = create<CalculatorStore>(set => ({
	...initialState,
	setFacilitySize: value => set({ facilitySize: value }),
	setUtilization: value => set({ utilization: value }),
	setCoolingType: value => set({ coolingType: value }),
	setResult: result => set({ result }),
	setCompareResult: data => set({ compareResult: data }),
	setActiveScenario: scenario => set({ activeScenario: scenario }),
	setLoading: loading => set({ isLoading: loading }),
	setError: error => set({ error }),
	reset: () => set(initialState),
}));
