import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../components/ui/ActionButton';
import { useTheme } from '../../theme/useTheme';

export function HomeScreen() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.brand}>
          <View
            accessible={false}
            style={[styles.mark, { backgroundColor: theme.accent }]}
          />
          <Text style={[styles.wordmark, { color: theme.text }]}>
            SplitBill
          </Text>
        </View>
        <Text style={[styles.eyebrow, { color: theme.muted }]}>
          MENOS CUENTAS. MÁS MOMENTOS.
        </Text>
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: theme.text }]}
        >
          {'Compartir la mesa.\nDividir con claridad.'}
        </Text>
        <Text style={[styles.body, { color: theme.muted }]}>
          Estamos preparando una forma más clara de repartir la cuenta, pensada
          primero para Colombia.
        </Text>
        <View style={[styles.card, { backgroundColor: theme.highlight }]}>
          <Text style={[styles.cardTitle, { color: theme.onHighlight }]}>
            Cada peso, en su lugar.
          </Text>
          <Text style={[styles.body, { color: theme.onHighlight }]}>
            La meta: revisar lo que consumieron, compartir lo que eligieron y
            entender lo que paga cada persona.
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={[styles.badge, { backgroundColor: theme.badge }]}>
            <Text style={[styles.badgeText, { color: theme.onBadge }]}>
              BASE INICIAL · FASE 0
            </Text>
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Estamos poniendo la mesa.
          </Text>
          <Text style={[styles.body, { color: theme.muted }]}>
            Todavía no podés crear ni escanear cuentas.
          </Text>
          <ActionButton
            label={expanded ? 'Ocultar detalles' : 'Conocer esta versión'}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          />
          {expanded && (
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.body, { color: theme.text }]}
            >
              Esta versión presenta el inicio y las bases del dinero exacto. La
              captura de recibos, el reparto y el guardado llegarán en próximas
              fases. Hoy no se almacenan cuentas ni fotos.
            </Text>
          )}
        </View>
        <Text style={[styles.footer, { color: theme.muted }]}>
          Sin registro. Sin backend. Con claridad desde el inicio.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    padding: 24,
    gap: 22,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  mark: {
    width: 18,
    height: 30,
    borderRadius: 8,
    transform: [{ rotate: '25deg' }],
  },
  wordmark: { fontSize: 24, fontWeight: '700', letterSpacing: -0.8 },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 1.3 },
  title: { fontSize: 38, fontWeight: '700', letterSpacing: -1.3 },
  body: { fontSize: 17, lineHeight: 26 },
  card: { padding: 24, borderRadius: 24, gap: 16 },
  cardTitle: { fontSize: 23, fontWeight: '600', letterSpacing: -0.4 },
  badge: { alignSelf: 'flex-start', borderRadius: 8, padding: 8 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  footer: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
});
