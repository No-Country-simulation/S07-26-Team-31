// components/LeadCapture.tsx
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

const LeadCapture = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Obtén el análisis completo</Text>

			<Text style={styles.subtitle}>
				Incluye breakdown por capa + PDF de metodología.
			</Text>

			<TextInput
				placeholder="nombre@compania.com"
				placeholderTextColor={Colors.dark.textMuted}
				keyboardType="email-address"
				autoCapitalize="none"
				style={styles.input}
			/>

			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>ENVIARME EL REPORTE</Text>
			</Pressable>

			<View style={styles.trustRow}>
				<Text style={styles.trustText}>
					🛡 No spam, un solo email con tu reporte.
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.surface,
		borderTopWidth: 2,
		borderTopColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 24,
		alignItems: 'center',
	},
	title: {
		fontFamily: Fonts.headline,
		fontSize: 24,
		fontWeight: '700',
		color: Colors.dark.primary,
		textAlign: 'center',
		marginBottom: 12,
	},
	subtitle: {
		fontFamily: Fonts.body,
		fontSize: 14,
		color: Colors.dark.textSecondary,
		textAlign: 'center',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		backgroundColor: Colors.dark.backgroundDeep,
		borderWidth: 1,
		borderColor: Colors.dark.border,
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 16,
		fontSize: 14,
		color: Colors.dark.text,
		marginBottom: 16,
	},
	button: {
		width: '100%',
		backgroundColor: Colors.dark.primary,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.dark.background,
		letterSpacing: 1,
	},
	trustRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	trustText: {
		fontFamily: Fonts.body,
		fontSize: 12,
		color: Colors.dark.textMuted,
	},
});

export default LeadCapture;
