import {
  addMoney,
  money,
  multiplyMoney,
  subtractMoney,
} from '../src/domain/money';

describe('dinero exacto', () => {
  test('COP conserva escala explícita y unidades menores', () => {
    expect(money(12345, 'COP', 2)).toEqual({
      minor: 12345,
      currency: 'COP',
      scale: 2,
    });
    expect(addMoney(money(10, 'COP', 2), money(20, 'COP', 2)).minor).toBe(30);
    expect(subtractMoney(money(10, 'COP', 2), money(20, 'COP', 2)).minor).toBe(
      -10,
    );
  });
  test.each([NaN, Infinity, 1.1, Number.MAX_SAFE_INTEGER + 1])(
    'rechaza importe %s',
    (value) => {
      expect(() => money(value, 'COP', 2)).toThrow();
    },
  );
  test.each([-1, 1.5, 10])('rechaza escala %s', (scale) => {
    expect(() => money(1, 'COP', scale)).toThrow();
  });
  test('rechaza moneda inválida y mezclas de escala o moneda', () => {
    expect(() => money(1, 'cop', 2)).toThrow();
    expect(() => addMoney(money(1, 'COP', 2), money(1, 'USD', 2))).toThrow();
    expect(() => addMoney(money(1, 'COP', 2), money(1, 'COP', 0))).toThrow();
  });
  test('rechaza overflow positivo y negativo sin redondear', () => {
    expect(() =>
      addMoney(money(Number.MAX_SAFE_INTEGER, 'COP', 2), money(1, 'COP', 2)),
    ).toThrow();
    expect(() =>
      subtractMoney(
        money(Number.MIN_SAFE_INTEGER, 'COP', 2),
        money(1, 'COP', 2),
      ),
    ).toThrow();
    expect(() =>
      multiplyMoney(money(Number.MAX_SAFE_INTEGER, 'COP', 2), 2),
    ).toThrow();
  });
  test('multiplica enteros y valida entradas incluso fuera del constructor', () => {
    expect(multiplyMoney(money(125, 'COP', 2), 3).minor).toBe(375);
    expect(() => multiplyMoney(money(1, 'COP', 2), 0.5)).toThrow();
    expect(() =>
      addMoney({ minor: 1.5, currency: 'COP', scale: 2 }, money(1, 'COP', 2)),
    ).toThrow();
    expect(Object.isFrozen(money(0, 'COP', 2))).toBe(true);
  });
});
