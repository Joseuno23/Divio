# Claridad visual antes que decoración

El inicio usa tipografía nativa, espacio generoso, tarjetas sobrias y una sola
acción informativa. No se muestran importes ficticios ni controles sin implementar.

## Color semántico

| Paleta                | Uso                                                |
| --------------------- | -------------------------------------------------- |
| `#102B2A`             | Tinta, botón claro y superficie oscura             |
| `#168B70`             | Marca decorativa, nunca texto pequeño sobre blanco |
| `#D5F6E4`             | Tarjeta destacada y botón oscuro                   |
| `#F6F8F7` / `#FFFFFF` | Fondo y superficie clara                           |
| `#F3B85B`             | Estado inicial con texto tinta                     |

Los tokens están en `src/theme/tokens.ts`. El modo oscuro usa fondo `#091C1B`,
texto claro y secundario `#B3CCC4`; el secundario claro es `#48615B`.
Las pruebas calculan luminancia sRGB y exigen ≥4.5:1 en los siete pares de texto
de cada tema. El verde decorativo no se usa como fondo de texto blanco pequeño.

## Accesibilidad

- Safe areas, contenido desplazable y ancho máximo de 600 puntos.
- Texto escalable sin límites de líneas; sin alturas fijas en tarjetas.
- Botón de altura mínima 52 pt, rol, etiqueta y estado expandido.
- Título con rol de encabezado; ninguna información depende sólo del color.

Pendiente en dispositivo: VoiceOver, tamaño de texto máximo, modo oscuro,
pantallas pequeñas y foco tras expansión. Las pruebas de componentes no reemplazan
esta inspección visual y asistiva.
