# Dinero exacto y procedencia explícita

**Implementado:** construcción, suma, resta y multiplicación por entero seguro.
**Planeado:** reparto, redondeo proporcional, impuestos, descuentos y servicio.

## Unidad y límites

`Money` contiene `minor`, `currency` y `scale`. `money(12345, 'COP', 2)` representa
123,45 COP. COP no implica escala cero. Ocultar decimales en una presentación
futura no cambia la unidad almacenada ni autoriza redondeos silenciosos.

Se exige código de tres letras mayúsculas (validación sintáctica, no catálogo ISO),
escala entera 0..9 e importe entero seguro de JavaScript. Los intermedios usan
`bigint`; se rechaza overflow antes de volver a `number`. Las operaciones validan
también objetos externos y rechazan mezcla de escala/moneda. Las primitivas admiten
negativos; los futuros casos de uso impondrán signos según su significado.

## Invariantes del motor futuro

- Cantidades enteras positivas; asignaciones por índice de unidad desde cero.
- Participantes 2..20 al confirmar; borradores pueden estar incompletos.
- Pesos compartidos enteros positivos, sin asignar una unidad dos veces.
- Repartir residuos por mayor resto con desempate por ID estable; conservar suma exacta.
- Impuestos y descuentos declaran alcance (cuenta/ítem), inclusión y procedencia.
  Los importes son magnitudes no negativas; la operación define su signo.
- No aplicar tasas predeterminadas: conservar cifras del recibo y confirmación humana.
- Servicio es unión excluyente: ninguno, incluido por referencia a un cargo del
  recibo, o adicional con importe. El incluido no suma de nuevo. Los validadores
  futuros deben comprobar que la referencia existe y está marcada como incluida.
- Una corrección invalida el snapshot anterior; no compartir cálculos obsoletos.
- Suma de participantes = total reconciliado; discrepancias bloquean confirmación.

Los tipos describen estas fronteras pero no implementan sus validadores ni el motor.
