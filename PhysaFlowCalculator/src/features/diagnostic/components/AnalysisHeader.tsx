import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Typography from '@/components/UI/Typography';
import { Colors } from '@/constants/Colors';


const AnalysisHeader = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.dark.primary}
        />
      </Pressable>

      <Typography
        variant="headlineMd"
        color={Colors.dark.primary}
      >
        PhysaFlow
      </Typography>

      <Pressable style={styles.iconButton}>
        <MaterialIcons
          name="account-circle"
          size={28}
          color={Colors.dark.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,

    backgroundColor: Colors.dark.background,
  },

  iconButton: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalysisHeader;