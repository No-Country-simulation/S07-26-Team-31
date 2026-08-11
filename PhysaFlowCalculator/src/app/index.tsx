import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useCalculatorStore } from '@/store/calculator-store';
import CoolingOptionCard from '@/components/UI/CoolingOptionCard';

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LabeledSlider from '@/components/UI/LabeledSlider';

export default function Index() {
	const router = useRouter();
	const { facilitySize, utilization, setFacilitySize, setUtilization } =
		useCalculatorStore();
	const { coolingType, setCoolingType } = useCalculatorStore();
	const coolingOptions = [
		{ type: 'air', icon: 'reorder-three', label: 'Enfriamiento\npor aire' },
		{ type: 'liquid', icon: 'water', label: 'Enfriamiento\nlíquido' },
		{ type: 'immersion', icon: 'layers', label: 'Enfriamiento\ninmersión' },
		{ type: 'hybrid', icon: 'git-merge', label: 'Enfriamiento\nhíbrido' },
	] as const;
	return (
		<Screen scrollable>
			<View style={styles.container}>
				<Text style={styles.title}>Calculador de capacidad</Text>
				<Text style={styles.subtitle}>
					Toma menos de 3 minutos optimizar su infraestructura.
				</Text>
			</View>
			<View style={styles.counterContainer}>
				<TextInput
					value={String(facilitySize)}
					onChangeText={text => {
						const num = parseInt(text, 10);
						if (!isNaN(num)) {
							setFacilitySize(num);
						} else if (text === '') {
							setFacilitySize(0);
						}
					}}
					keyboardType="numeric"
					style={styles.input}
				/>
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
				style={styles.button}
				onPress={() => {
					router.push('/basicResult');
				}}
			>
				<Text style={styles.buttonText}>Calcular</Text>
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
