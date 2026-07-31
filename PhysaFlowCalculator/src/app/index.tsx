import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import Slider from '@react-native-community/slider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Index() {
	return (
		<Screen>
			<View style={styles.container}>
				<Text style={styles.title}>Calculador de capacidad</Text>
				<Text style={styles.subtitle}>
					Toma menos de 3 minutos optimizar su infraestructura.
				</Text>
			</View>
			<View style={styles.counterContainer}>
				<TextInput value="10" keyboardType="numeric" style={styles.input} />

				<Text style={styles.suffix}>MW</Text>
			</View>
			<View style={{ marginBottom: 60 }}>
				<View>
					<Text style={{ color: '#fff' }}>Tamaño de almacen</Text>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={100}
						value={40}
						minimumTrackTintColor={Colors.dark.primary}
						maximumTrackTintColor={Colors.dark.primary}
						thumbTintColor={Colors.dark.primary}
					/>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						}}
					>
						<Text style={{ color: '#fff' }}>Uso</Text>
						<Text style={{ color: Colors.dark.primary, fontSize: 30 }}>
							40%
						</Text>
					</View>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={100}
						value={40}
						minimumTrackTintColor={Colors.dark.primary}
						maximumTrackTintColor={Colors.dark.primary}
						thumbTintColor={Colors.dark.primary}
					/>
				</View>
				<Text style={{ color: '#fff', marginBottom: 30 }}>
					Arquitectura de enfriamiento
				</Text>
				<View>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: 20,
						}}
					>
						<View style={styles.optionContainer}>
							<Ionicons
								name="reorder-three"
								size={28}
								color={Colors.dark.primary}
							/>
							<Text style={{ color: '#fff', textAlign: 'center' }}>
								Enfriamiento{'\n'} por aire
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<Ionicons
								name="reorder-three"
								size={28}
								color={Colors.dark.primary}
							/>
							<Text style={{ color: '#fff', textAlign: 'center' }}>
								Enfriamiento{'\n'} por aire
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<Ionicons
								name="reorder-three"
								size={28}
								color={Colors.dark.primary}
							/>
							<Text style={{ color: '#fff', textAlign: 'center' }}>
								Enfriamiento{'\n'} por aire
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<Ionicons
								name="reorder-three"
								size={28}
								color={Colors.dark.primary}
							/>
							<Text style={{ color: '#fff', textAlign: 'center' }}>
								Enfriamiento{'\n'} por aire
							</Text>
						</View>
					</View>
				</View>
			</View>
			<Pressable style={styles.button}>
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
