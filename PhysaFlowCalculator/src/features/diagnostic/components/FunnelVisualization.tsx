// components/FunnelVisualization.tsx
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import Arrow from '@/assets/images/arrow.svg';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

const FunnelVisualization = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>PhysaFlow Signature</Text>

			<View style={styles.canvas}>
				<Svg width="100%" height={260} viewBox="0 0 340 260">
					<Defs>
						<LinearGradient id="layerGradient" x1="0" y1="0" x2="0" y2="1">
							<Stop offset="0" stopColor={Colors.dark.primaryLight} />
							<Stop offset="1" stopColor={Colors.dark.backgroundDeep} />
						</LinearGradient>
					</Defs>

					<Polygon
						points="10,50 120,70 120,200 10,220"
						fill="url(#layerGradient)"
						stroke={Colors.dark.primary}
						strokeWidth={1.5}
					/>
					<Polygon
						points="120,70 220,85 220,185 120,200"
						fill="url(#layerGradient)"
						stroke={Colors.dark.primary}
						strokeWidth={1.5}
					/>
					<Polygon
						points="220,85 300,95 300,175 220,185"
						fill="url(#layerGradient)"
						stroke={Colors.dark.primary}
						strokeWidth={1.5}
					/>
				</Svg>

				{/* Flecha 1: base pegada al borde superior de Facility (~x80,y60) */}
				<View style={[styles.leak, { left: 55, top: 8 }]}>
					<Arrow width={50} height={50} />
					<View style={styles.leakLabel}>
						<Text style={styles.leakText}>Thermal</Text>
						<Text style={styles.leakText}>Leak</Text>
					</View>
				</View>

				{/* Flecha 2: base pegada al borde superior de IT Load (~x170,y77) */}
				<View style={[styles.leak, { left: 148, top: 27 }]}>
					<Arrow width={44} height={44} />
					<View style={styles.leakLabel}>
						<Text style={styles.leakText}>Zombie</Text>
						<Text style={styles.leakText}>Servers</Text>
					</View>
				</View>

				{/* Flecha 3: base pegada al borde superior de Workload (~x255,y90) */}
				<View style={[styles.leak, { left: 235, top: 44 }]}>
					<Arrow width={38} height={38} />
					<View style={styles.leakLabelNarrow}>
						<Text style={styles.leakText}>Redundancy</Text>
						<Text style={styles.leakText}>Overhead</Text>
					</View>
				</View>
			</View>

			<View style={styles.layerLabels}>
				<Text style={styles.layerLabel}>FACILITY</Text>
				<Text style={styles.layerLabel}>IT LOAD</Text>
				<Text style={styles.layerLabel}>WORKLOAD</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.backgroundDeep,
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.dark.border,
		overflow: 'hidden', // evita que cualquier resto se salga del card
	},
	title: {
		fontFamily: Fonts.body,
		fontSize: 16,
		color: Colors.dark.text,
		textAlign: 'center',
		marginBottom: 36,
	},
	canvas: {
		position: 'relative',
		width: '100%',
	},
	leak: {
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center',
	},
	leakLabel: {
		marginLeft: 2,
	},
	leakLabelNarrow: {
		marginLeft: 2,
		maxWidth: 70, // fuerza el wrap para que no se salga del card
	},
	leakText: {
		fontFamily: Fonts.body,
		fontSize: 10,
		fontWeight: '600',
		color: Colors.dark.text,
		lineHeight: 13,
	},
	layerLabels: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 8,
	},
	layerLabel: {
		fontFamily: Fonts.body,
		fontSize: 12,
		color: Colors.dark.text,
		fontWeight: '600',
	},
});

export default FunnelVisualization;
