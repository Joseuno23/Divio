# SplitBill · guía de trabajo

Leé este archivo al comenzar **cada sesión**, antes de implementar cambios.

## Resultado y alcance

SplitBill será un divisor de cuentas premium para iPhone, local-first, primero
Colombia/COP: reparto comprensible, trazable y exacto. La Fase 0 sólo entrega base
ejecutable, inicio honesto, primitivas monetarias, contratos y documentación.
No implementar aún CRUD, ocho pantallas, OCR, motor fiscal ni persistencia completa.
Sin login, backend, IA paga, servicios cloud ni credenciales.

## Stack y arquitectura

Expo Router + React Native + TypeScript estricto; versiones verificadas contra npm
y documentación oficial antes de instalar. Preparado para development builds y un
futuro módulo Swift VisionKit/Vision; Expo Go no validará ese módulo.

- `app/`: rutas y composición de navegación (a crear en esta inicialización).
- `src/features/home/`: inicio; `src/components/ui/`: componentes usados.
- `src/theme/`: tokens semánticos claros/oscuros y contraste.
- `src/domain/`: dinero y contratos puros, sin React ni Expo.
- `docs/`: documentación viva; avance en [PROGRESS](docs/PROGRESS.md).
- **Planeados, no implementados:** `src/database/`, repositorios SQLite,
  migraciones y módulo nativo OCR. No crear directorios vacíos.

## Convenciones y experiencia

Sin `any` injustificado, sin matemática de negocio en JSX. IDs estables;
funciones puras en dominio. UI premium sobria, tipografía nativa, safe areas,
texto escalable, objetivos táctiles de al menos 44 pt, contraste comprobado y
etiquetas accesibles. Sin datos simulados ni acciones que prometan funciones ausentes.

## Dinero, privacidad y calidad

Enteros seguros en unidades menores con moneda y escala explícitas; COP no implica
cero decimales. Intermedios exactos y rechazo de overflow. Conservar procedencia,
revisiones y evitar contar dos veces servicio incluido. Nunca inventar tasas fiscales.
Fotos y datos permanecerán locales; SQLite y eliminación asociada se diseñan para
Fase 2. No registrar recibos ni datos personales en logs.

Pruebas primero (rojo/verde) para dinero e inicio. Scripts previstos: `start`, `ios`,
`typecheck`, `lint`, `format:check`, `test`, `verify`. Verificar también compatibilidad
Expo, doctor y bundle iOS; exportar JS no demuestra compilación ni ejecución nativa.

## Flujo de modificación

1. Leer esta guía y el documento del área; verificar el estado real del repositorio.
2. Mantener comportamiento, pruebas y documentación en una unidad revisable.
3. Editar con `apply_patch`; preservar `.atl` y trabajo ajeno.
4. Ejecutar checks pertinentes y registrar resultados/bloqueos por separado.
5. Sin commits, push, agentes delegados ni cambios de configuración global autorizados.

## Referencias

[Inicio](README.md) · [Producto](docs/PRODUCT.md) ·
[Arquitectura](docs/ARCHITECTURE.md) · [Diseño](docs/DESIGN_SYSTEM.md) ·
[Datos](docs/DATA_MODEL.md) · [Reglas](docs/BUSINESS_RULES.md) ·
[OCR](docs/OCR_STRATEGY.md) · [Seguridad](docs/SECURITY.md) ·
[Pruebas](docs/TESTING.md) · [Roadmap](docs/ROADMAP.md) ·
[Decisiones](docs/DECISIONS.md)
