import { render, screen, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/features/home/HomeScreen';

test('inicio honesto, sin cuentas inventadas ni creación disponible', async () => {
  await render(<HomeScreen />);
  expect(
    screen.getByRole('header', {
      name: 'Compartir la mesa.\nDividir con claridad.',
    }),
  ).toBeTruthy();
  expect(
    screen.getByText('Todavía no podés crear ni escanear cuentas.'),
  ).toBeTruthy();
  expect(screen.queryByRole('button', { name: /crear cuenta/i })).toBeNull();
});

test('explica el alcance mediante una acción real y accesible', async () => {
  await render(<HomeScreen />);
  await fireEvent.press(
    screen.getByRole('button', { name: 'Conocer esta versión' }),
  );
  expect(
    screen.getByText(
      /La captura de recibos, el reparto y el guardado llegarán/,
    ),
  ).toBeTruthy();
  await fireEvent.press(
    screen.getByRole('button', { name: 'Ocultar detalles' }),
  );
  expect(
    screen.queryByText(
      /La captura de recibos, el reparto y el guardado llegarán/,
    ),
  ).toBeNull();
});
