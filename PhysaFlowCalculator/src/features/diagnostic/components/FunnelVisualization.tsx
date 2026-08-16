// components/FunnelVisualization.tsx
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import Arrow from '@/assets/images/arrow.svg';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

type LayerKey = 'facility' | 'itLoad' | 'workload';

type FunnelVisualizationProps = {
	thermalLeakMw: number;
	zombieServersMw: number;
	redundancyOverheadMw: number;
};
type LayerInfoEntry = {
	title: string;
	leakLabel: string;
	getValue: (p: FunnelVisualizationProps) => number;
};

const LAYER_INFO: Record<LayerKey, LayerInfoEntry> = {
	facility: {
		title: 'FACILITY',
		leakLabel: 'Thermal Leak',
		getValue: p => p.thermalLeakMw,
	},
	itLoad: {
		title: 'IT LOAD',
		leakLabel: 'Zombie Servers',
		getValue: p => p.zombieServersMw,
	},
	workload: {
		title: 'WORKLOAD',
		leakLabel: 'Redundancy Overhead',
		getValue: p => p.redundancyOverheadMw,
	},
};

const FunnelVisualization = (props: FunnelVisualizationProps) => {
	const { thermalLeakMw, zombieServersMw, redundancyOverheadMw } = props;
	const [activeLayer, setActiveLayer] = useState<LayerKey | null>(null);

	// Una animación de escala por capa
	const scales = useRef({
		facility: new Animated.Value(1),
		itLoad: new Animated.Value(1),
		workload: new Animated.Value(1),
	}).current;

	const animateLayer = (layer: LayerKey, active: boolean) => {
		Animated.spring(scales[layer], {
			toValue: active ? 1.05 : 1,
			useNativeDriver: true,
			speed: 20,
			bounciness: 6,
		}).start();
	};

	const handleActivate = (layer: LayerKey) => {
		setActiveLayer(layer);
		animateLayer(layer, true);
	};

	const handleDeactivate = (layer: LayerKey) => {
		setActiveLayer(current => (current === layer ? null : current));
		animateLayer(layer, false);
	};

	const layerOpacity = (layer: LayerKey) =>
		activeLayer === null || activeLayer === layer ? 1 : 0.35;

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
						<LinearGradient
							id="layerGradientActive"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<Stop offset="0" stopColor={Colors.dark.accent} />
							<Stop offset="1" stopColor={Colors.dark.primary} />
						</LinearGradient>
					</Defs>

					<Polygon
						points="10,50 120,70 120,200 10,220"
						fill={
							activeLayer === 'facility'
								? 'url(#layerGradientActive)'
								: 'url(#layerGradient)'
						}
						stroke={Colors.dark.primary}
						strokeWidth={activeLayer === 'facility' ? 2.5 : 1.5}
						opacity={layerOpacity('facility')}
					/>
					<Polygon
						points="120,70 220,85 220,185 120,200"
						fill={
							activeLayer === 'itLoad'
								? 'url(#layerGradientActive)'
								: 'url(#layerGradient)'
						}
						stroke={Colors.dark.primary}
						strokeWidth={activeLayer === 'itLoad' ? 2.5 : 1.5}
						opacity={layerOpacity('itLoad')}
					/>
					<Polygon
						points="220,85 300,95 300,175 220,185"
						fill={
							activeLayer === 'workload'
								? 'url(#layerGradientActive)'
								: 'url(#layerGradient)'
						}
						stroke={Colors.dark.primary}
						strokeWidth={activeLayer === 'workload' ? 2.5 : 1.5}
						opacity={layerOpacity('workload')}
					/>
				</Svg>

				{/* Zonas táctiles/hover invisibles superpuestas a cada capa del SVG */}
				<Pressable
					style={[styles.hitZone, { left: 5, width: 115, top: 45 }]}
					onHoverIn={() => handleActivate('facility')}
					onHoverOut={() => handleDeactivate('facility')}
					onPressIn={() => handleActivate('facility')}
					onPressOut={() => handleDeactivate('facility')}
				/>
				<Pressable
					style={[styles.hitZone, { left: 118, width: 100, top: 65 }]}
					onHoverIn={() => handleActivate('itLoad')}
					onHoverOut={() => handleDeactivate('itLoad')}
					onPressIn={() => handleActivate('itLoad')}
					onPressOut={() => handleDeactivate('itLoad')}
				/>
				<Pressable
					style={[styles.hitZone, { left: 216, width: 90, top: 80 }]}
					onHoverIn={() => handleActivate('workload')}
					onHoverOut={() => handleDeactivate('workload')}
					onPressIn={() => handleActivate('workload')}
					onPressOut={() => handleDeactivate('workload')}
				/>

				{/* Flecha 1: Thermal Leak */}
				<Animated.View
					style={[
						styles.leak,
						{
							left: 55,
							top: 8,
							opacity: layerOpacity('facility'),
							transform: [{ scale: scales.facility }],
						},
					]}
				>
					<Arrow width={50} height={50} />
					<View style={styles.leakLabel}>
						<Text style={styles.leakText}>Thermal</Text>
						<Text style={styles.leakText}>Leak</Text>
						<Text style={styles.leakValue}>{thermalLeakMw.toFixed(2)} MW</Text>
					</View>
				</Animated.View>

				{/* Flecha 2: Zombie Servers */}
				<Animated.View
					style={[
						styles.leak,
						{
							left: 148,
							top: 27,
							opacity: layerOpacity('itLoad'),
							transform: [{ scale: scales.itLoad }],
						},
					]}
				>
					<Arrow width={44} height={44} />
					<View style={styles.leakLabel}>
						<Text style={styles.leakText}>Zombie</Text>
						<Text style={styles.leakText}>Servers</Text>
						<Text style={styles.leakValue}>
							{zombieServersMw.toFixed(2)} MW
						</Text>
					</View>
				</Animated.View>

				{/* Flecha 3: Redundancy Overhead */}
				<Animated.View
					style={[
						styles.leak,
						{
							left: 235,
							top: 44,
							opacity: layerOpacity('workload'),
							transform: [{ scale: scales.workload }],
						},
					]}
				>
					<Arrow width={38} height={38} />
					<View style={styles.leakLabelNarrow}>
						<Text style={styles.leakText}>Redundancy</Text>
						<Text style={styles.leakText}>Overhead</Text>
						<Text style={styles.leakValue}>
							{redundancyOverheadMw.toFixed(2)} MW
						</Text>
					</View>
				</Animated.View>
			</View>

			<View style={styles.layerLabels}>
				{(['facility', 'itLoad', 'workload'] as LayerKey[]).map(key => (
					<Text
						key={key}
						style={[
							styles.layerLabel,
							activeLayer === key && styles.layerLabelActive,
						]}
					>
						{LAYER_INFO[key].title}
					</Text>
				))}
			</View>

			{/* Panel de detalle: aparece solo cuando hay una capa activa */}
			{activeLayer && (
				<View style={styles.detailPanel}>
					<Text style={styles.detailTitle}>
						{LAYER_INFO[activeLayer].title}
					</Text>
					<Text style={styles.detailLeak}>
						{LAYER_INFO[activeLayer].leakLabel}
					</Text>
					<Text style={styles.detailValue}>
						{LAYER_INFO[activeLayer].getValue(props).toFixed(2)} MW perdidos
					</Text>
				</View>
			)}
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
		overflow: 'hidden',
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
	hitZone: {
		position: 'absolute',
		height: 150,
		// @ts-ignore -- cursor solo aplica en web
		cursor: 'pointer',
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
		maxWidth: 70,
	},
	leakText: {
		fontFamily: Fonts.body,
		fontSize: 10,
		fontWeight: '600',
		color: Colors.dark.text,
		lineHeight: 13,
	},
	leakValue: {
		fontFamily: Fonts.body,
		fontSize: 9,
		fontWeight: '600',
		color: Colors.dark.primary,
		marginTop: 1,
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
	layerLabelActive: {
		color: Colors.dark.primary,
	},
	detailPanel: {
		marginTop: 16,
		padding: 12,
		borderRadius: 8,
		backgroundColor: Colors.dark.surface,
		borderWidth: 1,
		borderColor: Colors.dark.primary,
	},
	detailTitle: {
		fontFamily: Fonts.body,
		fontSize: 12,
		color: Colors.dark.textMuted,
		fontWeight: '700',
		letterSpacing: 1,
	},
	detailLeak: {
		fontFamily: Fonts.body,
		fontSize: 16,
		color: Colors.dark.error,
		fontWeight: '600',
		marginTop: 4,
	},
	detailValue: {
		fontFamily: Fonts.body,
		fontSize: 14,
		color: Colors.dark.primary,
		marginTop: 2,
	},
});

export default FunnelVisualization;
