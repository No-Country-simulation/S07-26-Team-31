import { StyleSheet, View } from 'react-native';

import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';


const HeroSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <View style={styles.statusDot} />

        <Typography
          variant="label"
          color={Colors.dark.textMuted}
        >
          Analysis Complete
        </Typography>
      </View>

      <View style={styles.titleContainer}>
        <Typography
          variant="dataLg"
          color={Colors.dark.primary}
          style={styles.percentage}
        >
          34%
        </Typography>

        <Typography
          variant="headlineLg"
          color={Colors.dark.primary}
        >
          Stranded Capacity
        </Typography>
      </View>

      <Typography
        variant="dataMd"
        color={Colors.dark.textMuted}
        style={styles.subtitle}
      >
        Equivalent to{' '}
        <Typography
          variant="dataMd"
          color={Colors.dark.primary}
        >
          3.4 MW
        </Typography>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    gap: 12,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.primary,
  },

  titleContainer: {
    gap: 4,
  },

  percentage: {
    fontSize: 56,
    lineHeight: 60,
  },

  subtitle: {
    letterSpacing: 1,
  },
});

export default HeroSection;