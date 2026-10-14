import { themes } from '../src/theme/tokens';

function luminance(hex: string): number {
  const channel = (offset: number) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

test.each(Object.entries(themes))(
  'contraste AA de texto en tema %s',
  (_, theme) => {
    const pairs = [
      [theme.text, theme.background],
      [theme.muted, theme.background],
      [theme.text, theme.surface],
      [theme.muted, theme.surface],
      [theme.onHighlight, theme.highlight],
      [theme.onButton, theme.button],
      [theme.onBadge, theme.badge],
    ];
    for (const [foreground, background] of pairs) {
      const a = luminance(foreground!);
      const b = luminance(background!);
      expect(
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
      ).toBeGreaterThanOrEqual(4.5);
    }
  },
);
