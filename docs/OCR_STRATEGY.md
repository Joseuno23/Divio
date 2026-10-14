# Captura nativa, revisión humana obligatoria

El OCR es futuro; no se solicita permiso de cámara ni se incluyen fotos en Fase 0.
La implementación prevista es un módulo Expo local Swift: VisionKit para captura
documental de varias páginas y Vision para reconocimiento en el dispositivo.

## Frontera prevista

1. Solicitar cámara al iniciar captura y explicar su finalidad.
2. Guardar cada imagen en almacenamiento privado con ID, orden y estado.
3. Devolver candidatos de texto y evidencia; nunca importes aceptados automáticamente.
4. Permitir corrección humana preservando original y vínculo a la captura.
5. Validar moneda, escala, duplicados entre páginas y totales antes del reparto.

Tratar cancelación como resultado normal. Diferenciar permiso denegado, dispositivo
no compatible, imagen ilegible y fallo de reconocimiento; ofrecer entrada manual
cuando esa fase esté implementada. No inventar consumos ni tasas a partir de texto ambiguo.

## Validación necesaria

Development build y dispositivo físico con Xcode completo; Expo Go no incorpora
el módulo propio. Comprobar capacidades y versiones de API de Apple antes de
implementarlo, orientación, memoria con varias capturas y eliminación de temporales.
No habrá llamadas a OCR remoto ni IA paga.
