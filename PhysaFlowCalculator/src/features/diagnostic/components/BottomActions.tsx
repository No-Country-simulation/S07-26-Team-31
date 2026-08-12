import Button from '@/components/UI/Button';
import { Colors } from '@/constants/Colors';
import { useCalculatorStore } from '@/store/calculator-store';
import { MaterialIcons } from '@expo/vector-icons';
import { Share, StyleSheet, View } from 'react-native';
import LeadCapture from './LeadCapture';
import { useState } from 'react';

type BottomActionsProps = {
	onUnlockAnalysis: () => void;
};
const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
const BottomActions = ({ onUnlockAnalysis }: BottomActionsProps) => {
	const { result } = useCalculatorStore();

	const handleShare = async () => {
		if (!result?.tokenCompartido) return;

		const shareUrl = `physaflowcalculator://result/${result.tokenCompartido}`;

		try {
			await Share.share({
				message: `Mi facility está desperdiciando ${result.porcentajeCapacidadDesperdiciada}% de capacidad. Mirá tu resultado en PhysaFlow: ${shareUrl}`,
			});
		} catch (error) {
			console.error('Error al compartir:', error);
		}
	};

	return (
		<>
			<LeadCapture />
			<View style={styles.container}>
				<Button
					title="Share Result"
					variant="secondary"
					onPress={handleShare}
					leftIcon={
						<MaterialIcons name="share" size={18} color={Colors.dark.text} />
					}
				/>

				<Button title="Unlock Complete Analysis" onPress={onUnlockAnalysis} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 16,
		marginTop: 24,
		marginBottom: 32,
	},
});

export default BottomActions;
