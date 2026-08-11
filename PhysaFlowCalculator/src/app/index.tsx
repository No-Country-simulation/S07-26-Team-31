import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import CoolingOptionCard from '@/components/UI/CoolingOptionCard';
import { useCalculatorStore, coolingTypeMap } from '@/store/calculator-store';
import { calculateCapacity } from '@/services/calculator-api';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LabeledSlider from '@/components/UI/LabeledSlider';

export default function Index() {
	const router = useRouter();
	const {
		facilitySize,
		utilization,
		coolingType,
		isLoading,
		setFacilitySize,
		setUtilization,
		setCoolingType,
		setResult,
		setLoading,
		setError,
	} = useCalculatorStore();

	const coolingOptions = [
		{ type: 'air', icon: 'reorder-three', label: 'Enfriamiento\npor aire' },
		{ type: 'liquid', icon: 'water', label: 'Enfriamiento\nlíquido' },
		{ type: 'immersion', icon: 'layers', label: 'Enfriamiento\ninmersión' },
		{ type: 'hybrid', icon: 'git-merge', label: 'Enfriamiento\nhíbrido' },
	] as const;
	const handleCalculate = async () => {
		if (!coolingType) {
			setError('Seleccioná un tipo de enfriamiento');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const data = await calculateCapacity({
				capacidadInstalacionMw: facilitySize,
				porcentajeUtilizacion: utilization,
				tipoEnfriamiento: coolingTypeMap[coolingType],
			});

			setResult(data);
			router.push('/basicResult');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo calcular.');
		} finally {
			setLoading(false);
		}
	};
	return (
		<Screen scrollable>
			<View style={styles.container}>
				<Text style={styles.title}>Calculador de capacidad</Text>
				<Text style={styles.subtitle}>
					Toma menos de 3 minutos optimizar su infraestructura.
				</Text>
			</View>

			<View style={{ marginBottom: 60 }}>
				<View>
					<LabeledSlider
						label="Tamaño de almacén"
						value={facilitySize}
						onChange={setFacilitySize}
						min={1}
						max={500}
						suffix=" MW"
					/>
				</View>
				<View>
					<View>
						<LabeledSlider
							label="Uso"
							value={utilization}
							onChange={setUtilization}
							min={0}
							max={100}
							suffix="%"
						/>
					</View>
				</View>
				<Text style={{ color: '#fff', marginBottom: 30 }}>
					Arquitectura de enfriamiento
				</Text>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: 20,
					}}
				>
					{coolingOptions.map(option => (
						<CoolingOptionCard
							key={option.type}
							icon={option.icon}
							label={option.label}
							selected={coolingType === option.type}
							onPress={() => setCoolingType(option.type)}
						/>
					))}
				</View>
			</View>
			<Pressable
				style={[styles.button, isLoading && { opacity: 0.6 }]}
				onPress={handleCalculate}
				disabled={isLoading}
			>
				<Text style={styles.buttonText}>
					{isLoading ? 'Calculando...' : 'Calcular'}
				</Text>
			</Pressable>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	counterContainer: {
		alignSelf: 'flex-end',
		backgroundColor: Colors.dark.surface,
		width: 100,
		flexDirection: 'row',
	},

	title: {
		fontFamily: Fonts.headline,
		fontWeight: 700,
		fontSize: 34,
		textAlign: 'center',
		color: Colors.dark.primaryLight,
	},

	subtitle: {
		fontFamily: Fonts.body,
		fontWeight: 600,
		fontSize: 16,
		color: Colors.dark.textMuted,
		textAlign: 'center',
	},
	input: {
		fontFamily: Fonts.headline,
		fontSize: 32,
		fontWeight: '700',
		color: Colors.dark.primary,
		minWidth: 60,
		textAlign: 'right',
	},
	stepper: {
		marginLeft: 8,
		backgroundColor: '#E8E8E8',
		borderRadius: 4,
		overflow: 'hidden',
	},
	stepperBtn: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		alignItems: 'center',
	},
	chevron: {
		fontSize: 12,
		color: '#333',
		fontWeight: '700',
	},
	suffix: {
		fontFamily: Fonts.body,
		fontSize: 12,
		color: Colors.dark.textMuted,
		marginLeft: 9,
		marginTop: 9,
	},
	optionContainer: {
		backgroundColor: Colors.dark.surface,
		borderColor: Colors.dark.primaryLight,
		borderWidth: 0.5,
		width: 150,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},
	slider: {
		width: '100%',
		height: 40,
	},
	button: {
		backgroundColor: Colors.dark.primary,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: Colors.dark.background,
		fontWeight: '700',
		fontSize: 16,
	},
});
