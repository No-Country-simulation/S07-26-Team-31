// components/UI/CoolingOptionCard.tsx
import { Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/UI/Card';
import { Colors } from '@/constants/Colors';

type CoolingOptionCardProps = {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	selected: boolean;
	onPress: () => void;
};

const CoolingOptionCard = ({
	icon,
	label,
	selected,
	onPress,
}: CoolingOptionCardProps) => {
	return (
		<Pressable onPress={onPress}>
			<Card style={[styles.card, selected && styles.cardSelected]}>
				<Ionicons
					name={icon}
					size={28}
					color={selected ? Colors.dark.primary : Colors.dark.textMuted}
				/>
				<Text style={[styles.label, selected && styles.labelSelected]}>
					{label}
				</Text>
			</Card>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.dark.surface,
		borderColor: Colors.dark.primaryLight,
		borderWidth: 0.5,
		width: 150,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardSelected: {
		borderColor: Colors.dark.primary,
		borderWidth: 1.5,
	},
	label: {
		color: Colors.dark.textMuted,
		textAlign: 'center',
		marginTop: 8,
	},
	labelSelected: {
		color: Colors.dark.text,
	},
});

export default CoolingOptionCard;
