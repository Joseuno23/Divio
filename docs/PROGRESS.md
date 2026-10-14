# Fase 0 · base implementada

Actualizado: 2026-10-14. Primer archivo del proyecto escrito y leído: `AGENTS.md`.
`.atl` se preservó. No hubo commits ni push. La implementación, revisión independiente
y correcciones se realizaron mediante agentes coordinados.
**Estado actual: `npm run verify` pasa; distribución bloqueada por riesgo de
dependencias sin resolver y validación nativa pendiente.**

## Entregado

- [x] Inicio honesto con tema claro/oscuro, safe areas y acción informativa.
- [x] Router, development client y configuración TypeScript estricta.
- [x] Dinero puro, contratos de las once entidades/valores y documentación de persistencia futura.
- [x] Pruebas primero para inicio y dinero; pruebas de contraste.
- [x] README y once documentos de producto, arquitectura y validación.

## Verificación actual · revisión correctiva

Entorno: Node 24.15.0, npm 11.12.1. Instalación npm con lockfile.
Sin cambios de dependencias: Expo 57.0.28, Router 57.0.26, RN 0.86.3,
React 19.2.3 y TypeScript 6.0.3.

- Rojo reproducido: `npm run format:check` falló en 111 archivos externos de `.agents/`.
- Corrección: `.prettierignore` excluye `.agents/` y `skills-lock.json` generado,
  sin reformatearlos. `.atl/`, `.expo/`, `node_modules/`, `dist/`, `coverage/`,
  `ios/`, `android/` y el lockfile npm ya estaban excluidos.
- Verde: `npm run verify` pasó tipos, lint, formato y 15 pruebas en 3 suites.
- Auditoría más reciente: `npm audit --json` salió 1 con **68 entradas:
  54 altas y 14 moderadas**; `npm audit --omit=dev --json` salió 1 con
  **63 entradas: 49 altas y 14 moderadas**. Ambos incluyen cinco avisos raíz,
  no 68/63 vulnerabilidades independientes. El total completo varió de 67 a 68
  entre consultas sin editar dependencias; no es evidencia de una regresión del código.

## Evidencia histórica · inicialización

Estos checks se registraron antes de esta corrección. Compatibilidad, doctor y
export no se repitieron: no cambió el árbol de dependencias ni el código de la app.

| Check                        | Resultado                                                 |
| ---------------------------- | --------------------------------------------------------- |
| Rojo inicial                 | 2 suites fallaron por módulos de dinero/inicio ausentes   |
| Pruebas tras implementación  | 3 suites, 15 pruebas pasaron                              |
| `expo install --check`       | Dependencies are up to date                               |
| `expo-doctor@1.20.4`         | 21/21 checks pasaron                                      |
| `npm run verify`             | Pase inicial; fallo posterior de alcance corregido arriba |
| `expo export --platform ios` | Bundle Hermes local: 1107 módulos, 2.4 MB, 23 assets      |

El bundle quedó en `dist/` (ignorado por git). Se corrigieron la inclusión explícita
de tipos Jest para TS6 y el alcance de la regla ESLint TypeScript antes del verify final.
Resolución de skills: `work-unit-commits` y `cognitive-doc-design`; trabajo directo
sin ceremonia SDD, con implementación y revisión delegadas.

## Bloqueos y riesgos separados

**Nativo bloqueado:** `xcode-select -p` devuelve
`/Library/Developer/CommandLineTools`; `xcodebuild -version` falla indicando que
requiere Xcode completo. No se compiló ni ejecutó en simulador/iPhone. No se modificó
la ruta de herramientas del sistema. Requisito SDK: Xcode ≥26.4, iOS ≥16.4.

**Distribución bloqueada por dependencias:** los anteriores 66 avisos de instalación
y 64 de omit-dev son históricos, no los resultados actuales.

- **Decoder en dependencias de runtime:** Router → query-string 7.1.3 →
  decode-uri-component 0.2.2. [GHSA-vcc3-ghjq-m6fr](https://github.com/advisories/GHSA-vcc3-ghjq-m6fr)
  describe DoS por entradas percent-encoded malformadas. El parser incluido en
  `expo-router/build/react-navigation/core/getStateFromPath.js:499` llama
  `queryString.parse`; el fork de Expo usa `URLSearchParams` en
  `fork/getStateFromPath-forks.js:371`. No se demostró explotación por la ruta
  predeterminada de esta app, pero tampoco se descarta toda exposición.
- **Sin parche compatible identificado:** el [fix upstream](https://github.com/SamVerschueren/decode-uri-component/commit/fa479dafeede7bedf04e5c89aa78f2a78c664005)
  reescribe el decoder como escáner UTF-8 de una pasada. La versión corregida
  0.5.0 es ESM; query-string 7 requiere una función CommonJS y declara `^0.2.2`.
  query-string 9.5.1 también es ESM y un salto mayor. Todas las versiones Router 57
  publicadas consultadas mantienen `^7.1.3`. No se aplicaron overrides, backports,
  parser propio, migraciones mayores ni `audit fix --force`.
- **Herramientas, no automáticamente runtime:** braces 3.0.3
  ([aviso](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)), node-forge 1.4.0
  ([aviso](https://github.com/advisories/GHSA-86w9-cpqp-85rv)) y sprintf-js
  ([aviso](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)) llegan por globbing/tests,
  CLI/certificados y argparse. `npm view` confirma que sus últimas versiones
  3.0.3, 1.4.0 y 1.1.3 siguen dentro de los rangos afectados; sprintf-js instalado
  es 1.0.3. Omitir dev no elimina herramientas declaradas como dependencias de Expo.
- **UUID:** xcode 3.0.1 usa `uuid.v4()` sin buffer (`lib/pbxProject.js:90`);
  [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq) afecta
  v3/v5/v6 con buffer. Ese uso inspeccionado no activa el defecto; el aviso sigue
  presente en audit, sin justificar un override mayor.

Mitigación operativa: mantener uso local controlado, no distribuir y no suministrar
entradas no confiables a las herramientas. El límite de entrada sugerido por el
aviso del decoder **no está implementado**: faltaría probar que cubre todos los
puntos de entrada antes del parser. Desbloquear requiere una actualización soportada
o remediación revisada con pruebas de URLs válidas/malformadas, compatibilidad Expo,
export y ejecución nativa. Un verify verde no es aprobación de seguridad.

**Validación manual pendiente:** accesibilidad real, apariencia y ejecución nativa.
Los tipos de contratos no son un motor ni validación relacional; SQLite y OCR
siguen planeados. El bundle JS no demuestra compilación o ejecución nativa.
