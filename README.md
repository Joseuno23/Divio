# SplitBill

Base ejecutable de un divisor de cuentas premium para iPhone, pensado primero
para Colombia. **Fase 0:** inicio claro/oscuro, dinero exacto y contratos de dominio.
El estado comprobado y los bloqueos están en [PROGRESS](docs/PROGRESS.md).

## Arrancar

Leé [AGENTS.md](AGENTS.md). Usá Node ≥22.13 (verificado con 24.15.0) y npm.

```sh
npm ci
npm run verify
npm start
```

`start` abre Metro para un development build ya instalado. Para compilar e instalar
localmente: `npm run ios`, con Xcode completo ≥26.4 y un simulador iOS ≥16.4.
En este entorno sólo hay Command Line Tools: todavía no se validó ejecución nativa.
No se requieren cuentas cloud ni credenciales para la validación en simulador.

## Qué incluye

- Una ruta de inicio y una acción real para desplegar el alcance de esta versión.
- Primitivas puras con enteros seguros, moneda/escala e intermedios `bigint`.
- Contratos de datos versionados; todavía sin almacenamiento ni cálculo de reparto.
- TypeScript estricto, ESLint, Prettier, Jest y pruebas de UI/contraste/dinero.

## Guía del proyecto

| Necesitás entender           | Documento                                                              |
| ---------------------------- | ---------------------------------------------------------------------- |
| Producto y etapas            | [Producto](docs/PRODUCT.md) · [Roadmap](docs/ROADMAP.md)               |
| Estructura y decisiones      | [Arquitectura](docs/ARCHITECTURE.md) · [Decisiones](docs/DECISIONS.md) |
| Interfaz                     | [Diseño](docs/DESIGN_SYSTEM.md)                                        |
| Dinero y persistencia futura | [Reglas](docs/BUSINESS_RULES.md) · [Datos](docs/DATA_MODEL.md)         |
| Captura local y privacidad   | [OCR](docs/OCR_STRATEGY.md) · [Seguridad](docs/SECURITY.md)            |
| Validación y avance real     | [Pruebas](docs/TESTING.md) · [Progreso](docs/PROGRESS.md)              |
