import { useColorScheme } from 'react-native';
import { themes } from './tokens';

export function useTheme() {
  return themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
