import { Colors } from '@/constants/Colors';
import { PropsWithChildren } from 'react';
import {
	ScrollView,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  padding?: number;
  scrollable?: boolean;
}>;

const Screen = ({
  children,
  style,
  backgroundColor = Colors.dark.backgroundDeep,
  padding = 16,
  scrollable = false,
}: ScreenProps) => {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        {
          padding,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.container,
        {
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor,
        },
      ]}
    >
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
});

export default Screen;