import BottomSheet from '@/components/UI/BottomSheet';
import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import AnalysisHeader from '@/features/diagnostic/components/AnalysisHeader';
import BottomActions from '@/features/diagnostic/components/BottomActions';
import FinancialCard from '@/features/diagnostic/components/FinancialCard';
import FunnelVisualization from '@/features/diagnostic/components/FunnelVisualization';
import HeroSection from '@/features/diagnostic/components/HeroSection';
import LeadCapture from '@/features/diagnostic/components/LeadCapture';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const BasicResult = () => {
	const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
	return (
		<Screen scrollable>
			<AnalysisHeader
			// title="PhysaFlow"
			// onBack={...}
			// rightIcon="account-circle"
			// onRightPress={...}
			/>
			<HeroSection
			// status="Analysis Complete"
			// percentage={34}
			// title="Stranded Capacity"
			// equivalent="3.4 MW"
			/>
			<FinancialCard
			// title="Estimated Financial Exposure"
			// value="$1.2M - $1.5M"
			// subtitle="Annual Loss"
			// benchmark="22% above industry average"
			// source="Data Center Benchmark v4.2"
			/>
			<View style={styles.cardsContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>PUE Factor</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'baseline',
						}}
					>
						<Text style={styles.accentText}>1.62</Text>
						<Text style={styles.criticalText}>+0.12</Text>
					</View>
				</View>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>CARBON COST</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'baseline',
						}}
					>
						<Text style={styles.accentText}>$45K/yr</Text>
					</View>
				</View>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>UTILIZATION</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'baseline',
						}}
					>
						<Text style={styles.accentText}>66.2%</Text>
					</View>
				</View>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>UTILIZATION</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'baseline',
						}}
					>
						<Text style={styles.criticalTextAlt}>CRITICAL</Text>
					</View>
				</View>
			</View>
			<FunnelVisualization />
			{/* <MetricsGrid
                metrics={[
                    {
                        title: 'PUE Factor',
                        value: '1.62',
                        subtitle: '+0.12 Δ',
                    },
                    {
                        title: 'Carbon Cost',
                        value: '$45K',
                        subtitle: '/year',
                    },
                    {
                        title: 'Utilization',
                        value: '66.2%',
                    },
                    {
                        title: 'Health Score',
                        value: 'Critical',
                        valueColor: Colors.dark.error,
                    },
                ]}
            /> */}

			<BottomActions onUnlockAnalysis={() => setLeadCaptureOpen(true)} />
			<Pressable
				style={styles.button}
				onPress={() => {
					router.push('/DepthAnalysis');
				}}
			>
				<Text style={styles.buttonText}>Calcular</Text>
			</Pressable>
			{/* <BottomSheet
				visible={leadCaptureOpen}
				onClose={() => setLeadCaptureOpen(false)}
			>
				<LeadCapture />
			</BottomSheet> */}
		</Screen>
	);
};

const styles = StyleSheet.create({
	cardsContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 16,
		marginTop: 24,
	},
	cardContainer: {
		backgroundColor: Colors.dark.surface,
		borderWidth: 1,
		borderColor: Colors.dark.border,
		justifyContent: 'space-evenly',
		width: '48%',
		height: 120,
		borderRadius: 8,
		padding: 16,
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
		fontSize: 18,
	},
	criticalTextAlt: {
		color: Colors.dark.error,
		fontSize: 32,
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

export default BasicResult;
