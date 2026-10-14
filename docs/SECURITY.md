# Datos locales con límites verificables

Fase 0 no almacena fotos, nombres ni cuentas; no incorpora analytics, login,
backend o servicios cloud. Las herramientas de desarrollo descargan paquetes y
consultan documentación; esto no representa un backend del producto.

## Diseño de Fase 2

- Guardar SQLite y fotos en el sandbox; no registrar contenido de recibos ni PII.
- Validar entradas externas y URIs; no aceptar rutas fuera del directorio propio.
- Borrar cuenta, relaciones y archivos mediante el proceso de [Datos](DATA_MODEL.md).
- Compartir sólo tras acción explícita y vista previa; limpiar archivos temporales.
- Definir exclusión de fotos de backups del sistema antes de prometer permanencia
  exclusivamente local. El sandbox no equivale a cifrado adicional propio.

## Dependencias

`package-lock.json` fija el árbol reproducible. Las alertas de auditoría y sus límites
se registran en [PROGRESS](PROGRESS.md). No ejecutar `npm audit fix --force`: las
soluciones propuestas pueden degradar Expo o romper su matriz nativa. Evaluar
advisories, alcance real y actualización compatible antes de distribuir.
