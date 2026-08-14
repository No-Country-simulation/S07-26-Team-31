// services/calculator-api.ts
import {
	CalculatorRequest,
	CalculatorResponse,
	CompareResponse,
} from '@/types/calculator';
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';

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

export async function downloadPdf(nombreArchivo: string): Promise<string> {
	const url = `${API_BASE_URL}/api/pdf/descargar/${nombreArchivo}`;
	const file = await File.downloadFileAsync(url, Paths.document);
	return file.uri;
}

export async function savePdfToDownloads(
	fileUri: string,
	fileName: string,
): Promise<boolean> {
	const permissions =
		await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

	if (!permissions.granted) {
		return false;
	}

	const base64 = await FileSystem.readAsStringAsync(fileUri, {
		encoding: FileSystem.EncodingType.Base64,
	});

	const destUri = await FileSystem.StorageAccessFramework.createFileAsync(
		permissions.directoryUri,
		fileName,
		'application/pdf',
	);

	await FileSystem.writeAsStringAsync(destUri, base64, {
		encoding: FileSystem.EncodingType.Base64,
	});

	return true;
}
