// components/UI/LabeledSlider.tsx
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

type LabeledSliderProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
	suffix?: string;
};

const LabeledSlider = ({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	showValue = true,
	suffix = '%',
}: LabeledSliderProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.label}>{label}</Text>
				{showValue && (
					<Text style={styles.value}>
						{value}
						{suffix}
					</Text>
				)}
			</View>

			<Slider
				style={styles.slider}
				minimumValue={min}
				maximumValue={max}
				step={step}
				value={value}
				onValueChange={onChange}
				minimumTrackTintColor={Colors.dark.primary}
				maximumTrackTintColor={Colors.dark.primary + '40'}
				thumbTintColor={Colors.dark.primary}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 24,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 4,
	},
	label: {
		fontFamily: Fonts.body,
		fontSize: 14,
		color: Colors.dark.text,
	},
	value: {
		fontFamily: Fonts.headline,
		fontSize: 24,
		fontWeight: '700',
		color: Colors.dark.primary,
	},
	slider: {
		width: '100%',
		height: 40,
	},
});

export default LabeledSlider;
