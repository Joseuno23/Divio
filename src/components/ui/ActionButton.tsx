import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface Props {
  label: string;
  expanded: boolean;
  onPress: () => void;
}

export function ActionButton({ label, expanded, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ expanded }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.button, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Text style={[styles.label, { color: theme.onButton }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    padding: 16,
    borderRadius: 18,
    justifyContent: 'center',
  },
  label: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
