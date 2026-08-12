import ScenarioToggle from '@/components/UI/ScenarioToggle';
import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import AnalysisHeader from '@/features/diagnostic/components/AnalysisHeader';
import FunnelVisualization from '@/features/diagnostic/components/FunnelVisualization';
import { StyleSheet, View, Text } from 'react-native';

const BasicResult = () => {
	return (
		<Screen style={{ gap: 32 }} scrollable>
			<AnalysisHeader
			// title="PhysaFlow"
			// onBack={...}
			// rightIcon="account-circle"
			// onRightPress={...}
			/>
			<ScenarioToggle />
			<FunnelVisualization />

			<View style={styles.cardsContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>TOTAL EFFICIENCY</Text>
					<Text style={styles.accentText}>42.5%</Text>
					<View style={styles.track}>
						<View style={[styles.fill, { width: '42.5%' }]} />
					</View>
				</View>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>OPERATIONAL LATENCY</Text>
					<Text style={styles.accentText}>2.4ms</Text>
					<View>
						<Text style={styles.criticalText}>ABOVE TARGET (+0.8MS)</Text>
					</View>
				</View>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	cardsContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		gap: 24,
	},
	cardContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		width: '100%',
		borderWidth: 1,
		borderColor: Colors.dark.border,
		borderRadius: 8,
		paddingVertical: 32,
		paddingHorizontal: 38,
		backgroundColor: Colors.dark.surface,
	},
	accentText: {
		color: Colors.dark.primaryLight,
		fontSize: 32,
	},
	cardTitle: {
		color: Colors.dark.textMuted,
		fontWeight: '600',
	},
	criticalText: {
		color: Colors.dark.error,
		fontSize: 12,
	},
	track: {
		width: '100%',
		height: 4,
		backgroundColor: Colors.dark.border,
		borderRadius: 2,
		overflow: 'hidden',
	},
	fill: {
		height: '100%',
		backgroundColor: Colors.dark.primary,
		borderRadius: 2,
	},
	criticalTextAlt: {
		color: Colors.dark.error,
		fontSize: 32,
	},
});

export default BasicResult;
