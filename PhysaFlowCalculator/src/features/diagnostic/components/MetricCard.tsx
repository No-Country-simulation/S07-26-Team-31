import Card from '@/components/UI/Card';
import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';


type MetricCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  valueColor?: string;
};

const MetricCard = ({
  title,
  value,
  subtitle,
  valueColor = Colors.dark.primary,
}: MetricCardProps) => {
  return (
    <Card>
      <View style={styles.container}>
        <Typography
          variant="label"
          color={Colors.dark.textMuted}
        >
          {title}
        </Typography>

        <Typography
          variant="dataLg"
          color={valueColor}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="bodySmall"
            color={Colors.dark.textMuted}
          >
            {subtitle}
          </Typography>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    minHeight: 90,
    justifyContent: 'center',
  },
});

export default MetricCard;