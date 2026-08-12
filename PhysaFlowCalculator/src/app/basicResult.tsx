import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import AnalysisHeader from '@/features/diagnostic/components/AnalysisHeader';
import BottomActions from '@/features/diagnostic/components/BottomActions';
import FinancialCard from '@/features/diagnostic/components/FinancialCard';
import FunnelVisualization from '@/features/diagnostic/components/FunnelVisualization';
import HeroSection from '@/features/diagnostic/components/HeroSection';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCalculatorStore } from '@/store/calculator-store';
import { useEffect } from 'react';
import MetricCard from '@/features/diagnostic/components/MetricCard';

const BasicResult = () => {
	const { result } = useCalculatorStore();

	return (
		<Screen scrollable>
			<AnalysisHeader />
			<HeroSection
				percentage={result?.porcentajeCapacidadDesperdiciada ?? 0}
				equivalentMw={result?.capacidadDesperdiciadaMw ?? 0}
			/>
			<FinancialCard
				minLoss={result?.perdidaAnualMinima ?? 0}
				maxLoss={result?.perdidaAnualMaxima ?? 0}
				industryComparison={result?.comparacionIndustria ?? 0}
			/>
			<View style={styles.cardsContainer}>
				<MetricCard
					title="PUE Factor"
					value={result?.pue.toFixed(2) ?? '—'}
					delta={
						result?.pueDelta ? `+${result.pueDelta.toFixed(2)}` : undefined
					}
				/>
				<MetricCard
					title="CARBON COST"
					value={
						result
							? `$${(result.costoCarbonoAnual / 1000).toFixed(1)}K/yr`
							: '—'
					}
				/>
				<MetricCard
					title="UTILIZATION"
					value={result ? `${result.utilizacionIt.toFixed(1)}%` : '—'}
				/>
				<MetricCard
					title="HEALTH STATUS"
					value={result?.estadoSalud ?? '—'}
					isCritical={
						result?.estadoSalud === 'CRITICAL' ||
						result?.estadoSalud === 'WARNING'
					}
				/>
			</View>
			<FunnelVisualization
				thermalLeakMw={result?.fugaTermicaMw ?? 0}
				zombieServersMw={result?.servidoresZombiMw ?? 0}
				redundancyOverheadMw={result?.sobrecostoRedundanciaMw ?? 0}
			/>

			<BottomActions />
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
