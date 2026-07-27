
import Screen from "@/components/UI/Screen";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>PhysaFlow</Text>
        <Text style={styles.subtitle}>
          Technical infrastructure management
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontFamily: Fonts.headline,
    fontSize: 32,
    color: Colors.dark.text,
  },

  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.dark.textMuted,
    textAlign: "center",
  },
});