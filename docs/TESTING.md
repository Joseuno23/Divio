# Verificar por capas

`npm run verify` combina tipos, lint, formato y pruebas. No sustituye compilar y
ejecutar en iPhone. Evidencia de esta sesión: [PROGRESS](PROGRESS.md).

## Comandos

| Comando                          | Comprueba                                              |
| -------------------------------- | ------------------------------------------------------ |
| `npm start`                      | Metro para development build                           |
| `npm run ios`                    | Generación, compilación e instalación local con Xcode  |
| `npm run typecheck`              | TypeScript estricto sin emitir                         |
| `npm run lint`                   | ESLint Expo, prohibición de any explícito              |
| `npm run format:check`           | Prettier, excluyendo .atl, skills externos y generados |
| `npm test`                       | Jest 29 + jest-expo, ejecución no interactiva          |
| `npm run verify`                 | Todos los checks de código anteriores                  |
| `npx expo install --check`       | Versiones compatibles con SDK                          |
| `npx expo-doctor@1.20.4`         | Diagnóstico de configuración/dependencias              |
| `npx expo export --platform ios` | Bundle de producción local, no binario nativo          |

## Casos actuales

Dinero: escala COP explícita, validación, incompatibilidad, overflow en ambos signos,
intermedios exactos, multiplicación entera e inmutabilidad. Inicio: estado honesto,
sin acción ficticia y expansión/colapso. Contraste: pares de texto de ambos temas ≥4.5:1.

Se escribieron primero las pruebas de dinero/inicio y se observó rojo por módulos
ausentes; después pasaron con la implementación. No se usan snapshots de UI ni
datos simulados de producción. Jest simula las dependencias nativas del SDK.

## Pendientes manuales

- [ ] Compilar development build y abrirlo en simulador/iPhone.
- [ ] VoiceOver y foco, texto máximo, safe areas y pantallas pequeñas.
- [ ] Revisar visualmente claro/oscuro y transición de tema.
- [ ] En fases posteriores: migraciones, eliminación de fotos, OCR real y conservación del total.
