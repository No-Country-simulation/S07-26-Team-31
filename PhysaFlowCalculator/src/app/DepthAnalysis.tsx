import ScenarioToggle from '@/components/UI/ScenarioToggle';
import Screen from '@/components/UI/Screen';
import { Colors } from '@/constants/Colors';
import AnalysisHeader from '@/features/diagnostic/components/AnalysisHeader';
import FunnelVisualization from '@/features/diagnostic/components/FunnelVisualization';
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { useCalculatorStore } from '@/store/calculator-store';
import { downloadPdf, savePdfToDownloads } from '@/services/calculator-api';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons';

const DepthAnalysis = () => {
	const { compareResult, activeScenario } = useCalculatorStore();
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadError, setDownloadError] = useState<string | null>(null);

	const activeData =
		activeScenario === 'optimized'
			? compareResult?.calculoOptimizado
			: compareResult?.calculoActual;

	const wastedCapacity = activeData?.porcentajeCapacidadDesperdiciada ?? 0;

	const handleDownloadPdf = async () => {
		if (!compareResult?.nombrePdf) {
			setDownloadError('No hay un PDF disponible');
			return;
		}

		setIsDownloading(true);
		setDownloadError(null);

		try {
			const fileUri = await downloadPdf(compareResult.nombrePdf);
			const saved = await savePdfToDownloads(fileUri, compareResult.nombrePdf);

			if (!saved) {
				setDownloadError('Necesitás dar permiso para guardar el archivo');
			}
		} catch (err) {
			setDownloadError('No se pudo descargar el PDF');
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<Screen style={{ gap: 32 }} scrollable>
			<AnalysisHeader />
			<ScenarioToggle />
			<FunnelVisualization
				thermalLeakMw={activeData?.fugaTermicaMw ?? 0}
				zombieServersMw={activeData?.servidoresZombiMw ?? 0}
				redundancyOverheadMw={activeData?.sobrecostoRedundanciaMw ?? 0}
			/>

			<View style={styles.cardsContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.cardTitle}>WASTED CAPACITY</Text>
					<Text style={styles.accentText}>{wastedCapacity.toFixed(1)}%</Text>
					<View style={styles.track}>
						<View style={[styles.fill, { width: `${wastedCapacity}%` }]} />
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

			<Pressable
				style={[styles.downloadButton, isDownloading && { opacity: 0.6 }]}
				onPress={handleDownloadPdf}
				disabled={isDownloading || !compareResult?.nombrePdf}
			>
				{isDownloading ? (
					<ActivityIndicator color={Colors.dark.background} />
				) : (
					<>
						<MaterialIcons
							name="picture-as-pdf"
							size={20}
							color={Colors.dark.background}
						/>
						<Text style={styles.downloadButtonText}>DESCARGAR PDF</Text>
					</>
				)}
			</Pressable>

			{downloadError && <Text style={styles.errorText}>{downloadError}</Text>}
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
	downloadButton: {
		flexDirection: 'row',
		backgroundColor: Colors.dark.primary,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	downloadButtonText: {
		color: Colors.dark.background,
		fontWeight: '700',
		fontSize: 16,
		letterSpacing: 1,
	},
	errorText: {
		color: Colors.dark.error,
		fontSize: 13,
		textAlign: 'center',
	},
});

export default DepthAnalysis;
