// components/features/diagnostic/components/BottomActions.tsx
import Button from '@/components/UI/Button';
import { Colors } from '@/constants/Colors';
import { useCalculatorStore } from '@/store/calculator-store';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Share, StyleSheet, View } from 'react-native';
import LeadCapture from './LeadCapture';
import { useState } from 'react';

const BottomActions = () => {
	const { result } = useCalculatorStore();
	const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);

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
			<View style={styles.container}>
				<Button
					title="Share Result"
					variant="secondary"
					onPress={handleShare}
					leftIcon={
						<MaterialIcons name="share" size={18} color={Colors.dark.text} />
					}
				/>

				<Button
					title="Unlock Complete Analysis"
					onPress={() => setLeadCaptureOpen(true)}
				/>
			</View>

			<Modal
				visible={leadCaptureOpen}
				transparent
				animationType="slide"
				onRequestClose={() => setLeadCaptureOpen(false)}
			>
				<Pressable
					style={styles.overlay}
					onPress={() => setLeadCaptureOpen(false)}
				>
					<Pressable
						style={styles.modalContent}
						onPress={e => e.stopPropagation()}
					>
						<LeadCapture onClose={() => setLeadCaptureOpen(false)} />
					</Pressable>
				</Pressable>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 16,
		marginTop: 24,
		marginBottom: 32,
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		width: '100%',
	},
});

export default BottomActions;
