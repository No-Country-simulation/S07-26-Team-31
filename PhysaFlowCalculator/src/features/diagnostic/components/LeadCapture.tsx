import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';
import { StyleSheet, TextInput, View } from 'react-native';



const LeadCapture = () => {
	return (
		<Card>
			<View style={styles.container}>
				<Typography variant="headlineMd">
					Unlock Complete Analysis
				</Typography>

				<Typography
					variant="body"
					color={Colors.dark.textMuted}
				>
					Receive a detailed report for your facility.
				</Typography>

				<View style={styles.benefits}>
					<Typography variant="body">
						✓ Layer-by-layer capacity breakdown
					</Typography>

					<Typography variant="body">
						✓ PDF methodology report
					</Typography>

					<Typography variant="body">
						✓ Complete facility analysis
					</Typography>

					<Typography variant="body">
						✓ Shareable results
					</Typography>
				</View>

				<View style={styles.inputContainer}>
					<Typography
						variant="label"
						color={Colors.dark.textMuted}
					>
						Work Email
					</Typography>

					<TextInput
						placeholder="name@company.com"
						placeholderTextColor={Colors.dark.textMuted}
						keyboardType="email-address"
						autoCapitalize="none"
						style={styles.input}
					/>
				</View>

				<Button
					title="View Complete Analysis"
					// fullWidth
				/>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},

	benefits: {
		gap: 10,
	},

	inputContainer: {
		gap: 8,
	},

	input: {
		height: 52,

		borderWidth: 1,
		borderColor: Colors.dark.border,
		borderRadius: 8,

		paddingHorizontal: 16,

		backgroundColor: Colors.dark.surface,

		color: Colors.dark.text,
	},
});

export default LeadCapture;