import { StyleSheet, View } from 'react-native';
import MetricCard from './MetricCard';

type Metric = {
    title: string;
    value: string;
    subtitle?: string;
    valueColor?: string;
};

type MetricsGridProps = {
    metrics: Metric[];
};

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
    return (
        <View style={styles.container}>
            {metrics.map((metric) => (
                <MetricCard
                    key={metric.title}
                    {...metric}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
});

export default MetricsGrid;