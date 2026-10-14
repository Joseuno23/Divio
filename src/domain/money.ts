export interface Money {
  readonly minor: number;
  readonly currency: string;
  readonly scale: number;
}

export function money(minor: number, currency: string, scale: number): Money {
  if (!Number.isSafeInteger(minor)) throw new RangeError('Importe no seguro');
  if (!/^[A-Z]{3}$/.test(currency))
    throw new RangeError('Código de moneda inválido');
  if (!Number.isInteger(scale) || scale < 0 || scale > 9)
    throw new RangeError('Escala fuera de 0..9');
  return Object.freeze({ minor: minor === 0 ? 0 : minor, currency, scale });
}

function validate(value: Money): void {
  money(value.minor, value.currency, value.scale);
}

function exact(value: bigint, unit: Money): Money {
  if (
    value > BigInt(Number.MAX_SAFE_INTEGER) ||
    value < BigInt(Number.MIN_SAFE_INTEGER)
  )
    throw new RangeError('Overflow monetario');
  return money(Number(value), unit.currency, unit.scale);
}

function compatible(a: Money, b: Money): void {
  validate(a);
  validate(b);
  if (a.currency !== b.currency || a.scale !== b.scale)
    throw new RangeError('Unidades monetarias incompatibles');
}

export function addMoney(a: Money, b: Money): Money {
  compatible(a, b);
  return exact(BigInt(a.minor) + BigInt(b.minor), a);
}

export function subtractMoney(a: Money, b: Money): Money {
  compatible(a, b);
  return exact(BigInt(a.minor) - BigInt(b.minor), a);
}

export function multiplyMoney(value: Money, count: number): Money {
  validate(value);
  if (!Number.isSafeInteger(count))
    throw new RangeError('Multiplicador no entero seguro');
  return exact(BigInt(value.minor) * BigInt(count), value);
}
