import Button from '@/components/UI/Button';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';


type BottomActionsProps = {
  onUnlockAnalysis: () => void;
};

const BottomActions = ({
  onUnlockAnalysis,
}: BottomActionsProps) => {
  return (
    <View style={styles.container}>
      <Button
        title="Share Result"
        variant="secondary"
        leftIcon={
          <MaterialIcons
            name="share"
            size={18}
            color={Colors.dark.text}
          />
        }
      />

      <Button
        title="Unlock Complete Analysis"
        onPress={onUnlockAnalysis}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 24,
    marginBottom: 32,
  },
});

export default BottomActions;