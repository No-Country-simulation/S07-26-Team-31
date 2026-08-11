// store/calculator-store.ts
import { create } from 'zustand';

export type CoolingType = 'air' | 'liquid' | 'immersion' | 'hybrid';

export type CalculatorStore = {
	facilitySize: number;
	utilization: number;
	coolingType: CoolingType | null;
	setFacilitySize: (value: number) => void;
	setUtilization: (value: number) => void;
	setCoolingType: (value: CoolingType) => void;
	reset: () => void;
};

const initialState = {
	facilitySize: 15,
	utilization: 40,
	coolingType: null,
};

export const useCalculatorStore = create<CalculatorStore>(set => ({
	...initialState,
	setFacilitySize: value => set({ facilitySize: value }),
	setUtilization: value => set({ utilization: value }),
	setCoolingType: value => set({ coolingType: value }),
	reset: () => set(initialState),
}));
