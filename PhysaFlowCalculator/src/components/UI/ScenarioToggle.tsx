// components/ScenarioToggle.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

const ScenarioToggle = () => {
	return (
		<View style={styles.container}>
			<Pressable style={[styles.option, styles.optionActive]}>
				<Text style={styles.textActive}>CURRENT</Text>
			</Pressable>

			<Pressable style={styles.option}>
				<Text style={styles.textInactive}>OPTIMIZED</Text>
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
