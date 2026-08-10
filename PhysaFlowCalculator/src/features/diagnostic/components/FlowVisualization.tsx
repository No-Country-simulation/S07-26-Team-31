import Card from '@/components/UI/Card';
import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';
import { Image, StyleSheet, View } from 'react-native';



const FlowVisualization = () => {
    return (
        <Card>
            <View style={styles.header}>
                <Typography
                    variant="label"
                    color={Colors.dark.primary}
                >
                    Flow Efficiency Visualization
                </Typography>

                <Typography
                    variant="label"
                    color={Colors.dark.textMuted}
                >
                    NODE: DC-ALPHA-09
                </Typography>
            </View>

            {/* <Image
        source={require('@/assets/images/flow-placeholder.png')}
        resizeMode="contain"
        style={styles.image}
      /> */}
            <View style={styles.placeholder}>
                <Typography
                    variant="body"
                    color={Colors.dark.textMuted}
                >
                    Flow Visualization
                </Typography>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 20,
    },

    image: {
        width: '100%',
        height: 240,
    },
    placeholder: {
        height: 240,
        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: Colors.dark.border,

        backgroundColor: Colors.dark.surface,
    },
});

export default FlowVisualization;