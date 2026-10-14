export const palette = {
  ink: '#102B2A',
  green: '#168B70',
  mint: '#D5F6E4',
  canvas: '#F6F8F7',
  white: '#FFFFFF',
  amber: '#F3B85B',
} as const;

export const themes = {
  light: {
    background: palette.canvas,
    surface: palette.white,
    text: palette.ink,
    muted: '#48615B',
    accent: palette.green,
    highlight: palette.mint,
    onHighlight: palette.ink,
    button: palette.ink,
    onButton: palette.white,
    badge: palette.amber,
    onBadge: palette.ink,
  },
  dark: {
    background: '#091C1B',
    surface: palette.ink,
    text: palette.canvas,
    muted: '#B3CCC4',
    accent: palette.green,
    highlight: palette.mint,
    onHighlight: palette.ink,
    button: palette.mint,
    onButton: palette.ink,
    badge: palette.amber,
    onBadge: palette.ink,
  },
} as const;
