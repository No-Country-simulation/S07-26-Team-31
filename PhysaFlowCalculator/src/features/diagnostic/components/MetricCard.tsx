// components/features/diagnostic/components/MetricCard.tsx
import Card from '@/components/UI/Card';
import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type MetricCardProps = {
	title: string;
	value: string;
	delta?: string;
	isCritical?: boolean;
};

const MetricCard = ({ title, value, delta, isCritical }: MetricCardProps) => {
	return (
		<Card style={styles.cardContainer}>
			<Typography variant="label" color={Colors.dark.textMuted}>
				{title}
			</Typography>
			<View style={styles.row}>
				<Typography
					variant="dataLg"
					color={isCritical ? Colors.dark.error : Colors.dark.primaryLight}
					style={isCritical ? styles.criticalText : undefined}
				>
					{value}
				</Typography>
				{delta && (
					<Typography variant="dataMd" color={Colors.dark.error}>
						{delta}
					</Typography>
				)}
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		justifyContent: 'space-evenly',
		width: '48%',
		height: 120,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	},
	criticalText: {
		fontSize: 30,
	},
});

export default MetricCard;
