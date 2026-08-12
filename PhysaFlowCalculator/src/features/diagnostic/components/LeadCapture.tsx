// components/LeadCapture.tsx
import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useCalculatorStore } from '@/store/calculator-store';
import { updateCalculationEmail } from '@/services/calculator-api';

type LeadCaptureProps = {
	onClose?: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LeadCapture = ({ onClose }: LeadCaptureProps) => {
	const router = useRouter();
	const { result, setResult } = useCalculatorStore();
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		if (!EMAIL_REGEX.test(email)) {
			setError('Ingresá un email válido');
			return;
		}

		if (!result?.id) {
			setError('No hay un cálculo activo');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const updated = await updateCalculationEmail(result.id, email);
			setResult(updated);

			onClose?.(); // cierra el modal
			router.push('/depthAnalysis'); // navega con los datos ya en el store
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo enviar');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Obtén el análisis completo</Text>

			<Text style={styles.subtitle}>
				Incluye breakdown por capa + PDF de metodología.
			</Text>

			<TextInput
				placeholder="nombre@compania.com"
				placeholderTextColor={Colors.dark.textMuted}
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<Pressable
				style={[styles.button, isLoading && { opacity: 0.6 }]}
				onPress={handleSubmit}
				disabled={isLoading}
			>
				{isLoading ? (
					<ActivityIndicator color={Colors.dark.background} />
				) : (
					<Text style={styles.buttonText}>ENVIARME EL REPORTE</Text>
				)}
			</Pressable>

			<View style={styles.trustRow}>
				<Text style={styles.trustText}>
					🛡 No spam, un solo email con tu reporte.
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.card,
		borderTopWidth: 2,
		borderTopColor: Colors.dark.primary,
		borderRadius: 12,
		paddingHorizontal: 24,
		paddingVertical: 48,
		alignItems: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: '700',
		color: Colors.dark.primary,
		textAlign: 'center',
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.dark.textSecondary,
		textAlign: 'center',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		backgroundColor: Colors.dark.surface,
		borderWidth: 1,
		borderColor: Colors.dark.border,
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 16,
		fontSize: 14,
		color: Colors.dark.text,
		marginBottom: 16,
	},
	errorText: {
		color: Colors.dark.error,
		fontSize: 13,
		marginBottom: 12,
		textAlign: 'center',
	},
	button: {
		width: '100%',
		backgroundColor: Colors.dark.primary,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.dark.background,
		letterSpacing: 1,
	},
	trustRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	trustText: {
		fontSize: 12,
		color: Colors.dark.textMuted,
	},
});

export default LeadCapture;
