# Growatt API Endpoints

## Plantas
- [x] Listar todas las plantas GET /plant/list
- [ ] Añadir una planta POST /plant/add 
- [ ] Conocer los detalles de una planta, actualizar o eliminar una planta GET,PUT,DELETE /plant/:id
- [ ] obtener el historial de una planta entre 2 fechas GET /plant/:id/history
- [ ] Obtener la generaión de energía de una planta durante un día GET /plant/:id/day

## Dataloggers
- [x] Ver todos los dataloggers GET /datalogger/list 
- [ ] Añadir un nuevo datalogger POST /datalogger/add
- [ ] Consultar información, actualizar parámetros, eliminar datalogger GET,PUT,DELETE /datalogger/:id

## Inversores
- [ ] GET /device/:plantID/list
- [ ] GET,PUT,DELETE /device/inverter/:sn
- [ ] POST /device/inverter/:sn/history
- [ ] GET /device/inverter/:sn/alarm (Email Notification Backend Monitoring. Voltage, Frequency, etc)
- [ ] GET /device/inverter/:sn/lastData
- [ ] POST /device/inverter/batch

## Storage
- [ ] POST /device/storage/alarm (Email Notification Backend Monitoring, Energy fall, etc)
- [ ] GET,PUT,DELETE /device/storage/:storageSN
- [ ] GET /device/storage/:id/last
- [ ] POST /device/storage/history

## Thresholds (DB Needed)
- [ ] POST /device/inverter/voltThreshold 
- [ ] POST /device/inverter/freqThreshold 


y, las siguientes rutas implementan sistemas de notificación por correo electrónico

- [ ] GET /device/inverter/:sn/alarm (Email Notification Backend Monitoring. Voltage, Frequency, etc)
- [ ] POST /device/storage/alarm (Email Notification Backend Monitoring, Energy fall, etc)

además de que las rutas siguientes, que por el momento no has implementado, utilizan la base de datos para guardar los respectivos umbrales de voltaje y frecuencia para activar las alarmas en los inversores. Todos estos datos los guardarás dentro de la colección "inversores" y la colección "paneles_alarma" dentro de firestore.

- [ ] POST /device/inverter/voltThreshold 
- [ ] POST /device/inverter/freqThreshold