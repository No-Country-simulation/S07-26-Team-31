import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';



type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variants[variant].container,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variants[variant].text.color} />
      ) : (
        <View style={styles.content}>
          {leftIcon}

          <Text
            style={[
              styles.text,
              variants[variant].text,
            ]}
          >
            {title}
          </Text>

          {rightIcon}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  text: {
    fontFamily: Fonts.label,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  pressed: {
    opacity: 0.85,
  },

  disabled: {
    opacity: 0.5,
  },
});

const variants = {
  primary: {
    container: {
      backgroundColor: Colors.dark.primary,
    },
    text: {
      color: '#241a00',
    },
  },

  secondary: {
    container: {
      backgroundColor: Colors.dark.surface,
      borderWidth: 1,
      borderColor: Colors.dark.border,
    },
    text: {
      color: Colors.dark.text,
    },
  },

  ghost: {
    container: {},
    text: {
      color: Colors.dark.primary,
    },
  },
} as const;

export default Button;