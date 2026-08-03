import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

type BottomSheetProps = {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
};

const BottomSheet = ({
  visible,
  children,
  onClose,
  style,
}: BottomSheetProps) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <SafeAreaView
          edges={['bottom']}
          style={[styles.sheet, style]}
        >
          <View style={styles.handle} />

          {children}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  sheet: {
    backgroundColor: Colors.dark.background,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,

    maxHeight: '85%',
  },

  handle: {
    alignSelf: 'center',

    width: 48,
    height: 5,

    borderRadius: 999,

    marginBottom: 20,

    backgroundColor: Colors.dark.borderStrong,
  },
});

export default BottomSheet;