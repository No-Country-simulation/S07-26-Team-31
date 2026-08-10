import Card from '@/components/UI/Card';
import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';


const FinancialCard = () => {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.left}>
          <Typography
            variant="label"
            color={Colors.dark.textMuted}
          >
            Estimated Financial Exposure
          </Typography>

          <View style={styles.amountContainer}>
            <Typography
              variant="dataLg"
              color={Colors.dark.primary}
            >
              $1.2M - $1.5M
            </Typography>

            <Typography
              variant="bodySmall"
              color={Colors.dark.textMuted}
            >
              Annual Loss
            </Typography>
          </View>
        </View>

        <View style={styles.right}>
          <Typography
            variant="dataMd"
            color={Colors.dark.error}
            style={styles.benchmark}
          >
            ▲ 22% above industry average
          </Typography>

          <Typography
            variant="bodySmall"
            color={Colors.dark.textMuted}
          >
            Data Center Benchmark v4.2
          </Typography>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  left: {
    gap: 8,
  },

  amountContainer: {
    gap: 2,
  },

  right: {
    gap: 4,
  },

  benchmark: {
    fontWeight: '700',
  },
});

export default FinancialCard;