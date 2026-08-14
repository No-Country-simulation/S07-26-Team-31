import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useCalculatorStore } from '@/store/calculator-store';

const ScenarioToggle = () => {
	const { activeScenario, setActiveScenario, compareResult } =
		useCalculatorStore();

	// Si todavía no llegó el compare, no tiene sentido mostrar "Optimized" como opción usable
	const hasOptimizedData = !!compareResult;

	return (
		<View style={styles.container}>
			<Pressable
				style={[
					styles.option,
					activeScenario === 'current' && styles.optionActive,
				]}
				onPress={() => setActiveScenario('current')}
			>
				<Text
					style={
						activeScenario === 'current'
							? styles.textActive
							: styles.textInactive
					}
				>
					CURRENT
				</Text>
			</Pressable>

			<Pressable
				style={[
					styles.option,
					activeScenario === 'optimized' && styles.optionActive,
				]}
				onPress={() => hasOptimizedData && setActiveScenario('optimized')}
				disabled={!hasOptimizedData}
			>
				<Text
					style={
						activeScenario === 'optimized'
							? styles.textActive
							: styles.textInactive
					}
				>
					OPTIMIZED
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: Colors.dark.border,
		borderRadius: 8,
		overflow: 'hidden',
	},
	option: {
		flex: 1,
		paddingVertical: 14,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.dark.background,
	},
	optionActive: {
		backgroundColor: Colors.dark.primary,
	},
	textActive: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.dark.background,
		letterSpacing: 1,
	},
	textInactive: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.dark.textMuted,
		letterSpacing: 1,
	},
});

export default ScenarioToggle;
