# Contratos hoy; SQLite en Fase 2

`src/domain/contracts.ts` implementa tipos TypeScript de diseño. No hay tablas,
repositorios, migraciones ejecutadas ni validación relacional en runtime.
El esquema siguiente es el objetivo de persistencia, no una base ya creada.

## Identidad y relaciones planeadas

Toda entidad usa ID textual estable (UUID generado localmente en el futuro),
`revision` entero positivo e IDs foráneos; nombres y posiciones no son identidad.

| Entidad             | Relación y campos principales                                                                  | Restricción / índice previsto                                       |
| ------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Bill                | Título, moneda, escala, fechas UTC                                                             | PK id; índice updatedAt                                             |
| Participant         | billId, nombre, posición                                                                       | FK Bill; unique(billId, position); 2..20 al confirmar               |
| ReceiptCapture      | billId, URI local, posición, estado                                                            | FK Bill; unique(billId, position); URI dentro del sandbox           |
| ReceiptItem         | billId, descripción, cantidad, precio unitario, origen                                         | FK Bill; índice billId; cantidad positiva                           |
| ReceiptTax          | billId, destino cuenta/ítem, importe, inclusión, origen                                        | FK Bill/Item; índices billId e itemId; importe ≥0                   |
| ReceiptDiscount     | billId, destino cuenta/ítem, importe, inclusión, origen                                        | Igual que Tax, magnitud positiva                                    |
| Assignment          | billId, itemId, unitIndex, modo                                                                | FK Bill/Item; unique(itemId, unitIndex); índice billId              |
| AssignmentShare     | assignmentId, participantId, peso                                                              | FKs; unique(assignmentId, participantId); índice participantId      |
| ServiceCharge       | Una elección por Bill: ninguno/incluido/adicional                                              | PK/FK billId; incluido referencia ReceiptTax; CHECK excluyente      |
| CalculationSnapshot | billId, revisión de cuenta/entradas, esquema/motor, servicio, total y totales por participante | FK Bill; unique(billId, billRevision, engineVersion); índice billId |

Los contratos usan destinos discriminados; SQLite podrá representarlos con columnas
nullable y CHECK que exijan sólo la combinación válida. `ServiceCharge` es un valor
discriminado y se persiste asociado a Bill, no necesita una identidad independiente.
Moneda y escala deben coincidir dentro de la cuenta. Relaciones cruzadas entre cuentas
se rechazarán con claves compuestas o validación transaccional, no sólo con FKs simples.

## Evidencia y revisiones

El origen manual se marca revisado. OCR conserva captureId, texto original,
corrección nullable y estado de revisión; estos campos se mapearán a columnas.
No sobrescribir evidencia original. `inputRevisions` registra todas las entradas
que produjeron un snapshot; sus totales son inmutables y nunca autoridad de entrada.
El esquema de almacenamiento se versionará por migraciones numeradas y
`PRAGMA user_version`, separado de la revisión del dato y versión del motor.

## Transacciones, índices y eliminación

Activar FKs en cada conexión. Migraciones hacia adelante en transacción, con pruebas
de upgrade desde cada versión soportada y recuperación ante interrupción; nunca
reiniciar silenciosamente una base que no migra.

Borrar Bill elimina hijos y snapshots en cascada. Borrar participante con asignaciones
o captura referenciada requiere primero resolver referencias; no dejar evidencia
huérfana. Toda modificación de entrada incrementa Bill.revision e invalida snapshots.
Eliminar fotos exige una cola local transaccional de eliminación: confirmar cambios
de BD, borrar archivos y reintentar pendientes al iniciar. SQLite no puede deshacer
una eliminación del filesystem. Ver [Seguridad](SECURITY.md).
