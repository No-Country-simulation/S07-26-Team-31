// services/calculator-api.ts
import {
	CalculatorRequest,
	CalculatorResponse,
	CompareResponse,
} from '@/types/calculator';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function calculateCapacity(
	payload: CalculatorRequest,
): Promise<CalculatorResponse> {
	const response = await fetch(`${API_BASE_URL}/api/calculations`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		throw new Error(
			errorBody?.message ?? `Error al calcular: ${response.status}`,
		);
	}

	return response.json();
}

export async function compareScenarios(
	token: string,
	email: string,
): Promise<CompareResponse> {
	const response = await fetch(
		`${API_BASE_URL}/api/calculations/${token}/compare`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		},
	);

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		throw new Error(errorBody?.message ?? `Error: ${response.status}`);
	}

	return response.json();
}
