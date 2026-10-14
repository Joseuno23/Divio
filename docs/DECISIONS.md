# Decisiones de la inicialización

## SDK estable verificado · 2026-10-14

Se eligió `expo@57.0.28` (dist-tag `latest` y `sdk-57`), React Native `0.86.3`,
React `19.2.3` y Router `57.0.26`. npm también publica RN `0.87.1` y Expo
`58.0.9` en `next`: no se mezclaron con la matriz estable de SDK 57.

Fuentes consultadas antes de instalar:

- [Referencia oficial SDK y requisitos](https://docs.expo.dev/versions/latest/):
  RN 0.86, React 19.2.3, Node ≥22.13, iOS ≥16.4 y Xcode ≥26.4.
- [Instalación Router](https://docs.expo.dev/router/installation/): entry point y dependencias nativas.
- [Pruebas Expo](https://docs.expo.dev/develop/unit-testing/): jest-expo; SDK 57 usa Jest 29.
- Context7 `/websites/expo_dev`: instalación y configuración de entrada/rutas.
- npm: `npm view expo dist-tags --json`, versiones y peers de RN, React,
  Router, jest-expo, RNTL, TypeScript y ESLint. La matriz local
  `node_modules/expo/bundledNativeModules.json` guía `expo install`.

## Resolución de peers

npm eligió inicialmente react-dom 19.3 y Worklets 0.13, incompatibles con React
19.2.3/Expo 57. Overrides fijan react-dom 19.2.3, Reanimated 4.5.1 y Worklets 0.10.1
según la matriz SDK. Son peers transitivos de Router; la app no importa Reanimated
ni añade Zustand. El costo es revisar estos pins con cada upgrade de Expo.

`expo install` seleccionó TypeScript 6.0.3, jest-expo 57.0.6 y Jest 29.7.0.
RNTL 14.1.0 usa su renderer compatible con React 19; el preset Expo aún trae
react-test-renderer transitivamente. No se añadió como dependencia directa.

## Límites intencionales

- `bigint` sólo en intermedios: precisión sin persistir valores no serializables.
- Contratos discriminados conservan procedencia y evitan representar servicio
  incluido y adicional a la vez; validación relacional pendiente del motor.
- Una pantalla y estado React local: menos dependencias antes de necesitar repositorios.
- Development builds locales: integración Swift futura sin depender de Expo Go ni cloud.
