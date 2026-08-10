import { Colors } from '@/constants/Colors';
import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';



type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padding?: number;
}>;

const Card = ({
  children,
  style,
  padding = 16,
}: CardProps) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
  },
});

export default Card;