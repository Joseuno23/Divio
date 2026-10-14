# Avanzar sin adelantar el motor

| Fase         | Resultado                                             | Cierre esperado                                             |
| ------------ | ----------------------------------------------------- | ----------------------------------------------------------- |
| 0 · actual   | Inicio, contratos, dinero y calidad                   | Checks JS y validación nativa documentada por separado      |
| 1 · planeada | Flujo manual de cuenta, participantes y consumos      | IDs estables, estados incompletos explícitos, accesibilidad |
| 2 · planeada | SQLite local, repositorios, migraciones y eliminación | Reinicio sin pérdida, upgrades y borrado asociado probados  |
| 3 · planeada | VisionKit/Vision y corrección humana                  | Múltiples capturas, fallos y permisos en dispositivo        |
| 4 · planeada | Asignaciones, cargos, descuentos y servicio           | Conservación exacta, trazabilidad y snapshots revisados     |
| 5 · planeada | Resumen y compartir nativo                            | Datos confirmados, privacidad y validación integral         |

El orden puede revisarse con evidencia de uso. No ampliar Fase 0 con pantallas
de relleno. Próximo paso inmediato: resolver [bloqueos de verificación](PROGRESS.md).
