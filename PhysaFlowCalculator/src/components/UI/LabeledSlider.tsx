// components/UI/LabeledSlider.tsx
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
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
	const [isEditing, setIsEditing] = useState(false);
	const [textValue, setTextValue] = useState(String(value));

	// Mantiene sincronizado el texto cuando el valor cambia desde el slider
	useEffect(() => {
		if (!isEditing) {
			setTextValue(String(value));
		}
	}, [value, isEditing]);

	const handleTextChange = (text: string) => {
		// Permite solo números y un punto decimal mientras se escribe
		const cleaned = text.replace(/[^0-9.]/g, '');
		setTextValue(cleaned);
	};

	const commitTextValue = () => {
		setIsEditing(false);

		const num = parseFloat(textValue);
		if (!isNaN(num)) {
			const clamped = Math.min(Math.max(num, min), max);
			onChange(clamped);
			setTextValue(String(clamped));
		} else {
			setTextValue(String(value));
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.label}>{label}</Text>

				{showValue &&
					(isEditing ? (
						<TextInput
							style={styles.valueInput}
							value={textValue}
							onChangeText={handleTextChange}
							onBlur={commitTextValue}
							onSubmitEditing={commitTextValue}
							keyboardType="numeric"
							autoFocus
							selectTextOnFocus
						/>
					) : (
						<Pressable onPress={() => setIsEditing(true)}>
							<Text style={styles.value}>
								{value}
								{suffix}
							</Text>
						</Pressable>
					))}
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
	valueInput: {
		fontFamily: Fonts.headline,
		fontSize: 24,
		fontWeight: '700',
		color: Colors.dark.primary,
		minWidth: 60,
		textAlign: 'right',
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.primary,
		padding: 0,
	},
	slider: {
		width: '100%',
		height: 40,
	},
});

export default LabeledSlider;
