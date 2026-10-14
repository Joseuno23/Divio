# Base pequeña, dominio independiente

La navegación compone pantallas; el dominio puro conoce dinero y contratos, no React,
Expo ni almacenamiento. La Fase 0 no necesita un estado global.

## Directorios reales

| Ruta                 | Responsabilidad                              |
| -------------------- | -------------------------------------------- |
| `app/`               | Layout Stack y ruta de inicio                |
| `src/features/home/` | Presentación y expansión local del alcance   |
| `src/components/ui/` | Botón accesible utilizado por inicio         |
| `src/theme/`         | Colores semánticos y selección según sistema |
| `src/domain/`        | Operaciones monetarias y contratos de diseño |
| `tests/`             | Pruebas fuera del árbol de rutas             |
| `docs/`              | Documentación y evidencia                    |

## Fronteras futuras

En Fase 2, `src/database/` contendrá migraciones y adaptadores SQLite; los casos de
uso dependerán de interfaces de repositorio, no de consultas en componentes.
No se crearon directorios ni repositorios vacíos. Cada escritura deberá incrementar
la revisión de cuenta y ejecutarse transaccionalmente con sus hijos.

Un módulo Expo local en Swift envolverá VisionKit/Vision. Su salida será evidencia
OCR sin calcular dinero. El puente serializará resultados, errores y cancelación;
JavaScript validará toda entrada antes de incorporarla al dominio.

## Desarrollo nativo

`expo-dev-client` está instalado y configurado; `expo run:ios` generará el proyecto
nativo mediante prebuild. `ios/` y `android/` son generados y están ignorados.
Expo Go no prueba un módulo Swift propio. La exportación Metro sólo prueba bundling.

Dependencias y decisiones: [DECISIONS](DECISIONS.md).
