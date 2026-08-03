import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';


type TypographyVariant =
  | 'headlineLg'
  | 'headlineMd'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'dataLg'
  | 'dataMd';

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const Typography = ({
  children,
  variant = 'body',
  color,
  style,
  ...props
}: Props) => {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        variants[variant],
        color && { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Colors.dark.text,
    fontFamily: Fonts.body,
  },
});

const variants = StyleSheet.create({
  headlineLg: {
    fontFamily: Fonts.headline,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },

  headlineMd: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },

  body: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 24,
  },

  bodySmall: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },

  label: {
    fontFamily: Fonts.label,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  dataLg: {
    fontFamily: Fonts.label,
    fontSize: 24,
    fontWeight: '700',
  },

  dataMd: {
    fontFamily: Fonts.label,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Typography;