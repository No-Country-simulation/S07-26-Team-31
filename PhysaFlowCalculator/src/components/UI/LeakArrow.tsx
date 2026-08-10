import { View, StyleSheet } from 'react-native';
import Arrow from '@/assets/images/arrow.svg';

const LeakArrow = () => {
	return (
		<View style={styles.container}>
			<Arrow width={80} height={80} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// solo para verlo aislado mientras probás
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default LeakArrow;
