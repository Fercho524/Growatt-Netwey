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
- [ ] Obtener los inversires por planta GET /device/:plantID/list
- [ ] Ver detalles, actualizar o eliminar un dispositivo GET,PUT,DELETE /device/inverter/:sn
- [ ] Consultar el historial de un inversor POST /device/inverter/:sn/history
- [ ] Ver los últimos datos del inversor y enviar una notificación si hay una variación en el voltaje elevada GET /device/inverter/:sn/alarm (Email Notification Backend Monitoring. Voltage, Frequency, etc)
- [ ] Obtener los últimos datos del inversorGET /device/inverter/:sn/lastData
- [ ] Obtener los últimos datos de varios inversores POST /device/inverter/batch

Todas las funciones de notificación se realizarán cada cierto tiempo que el servidor obtenga los datos de la api, y luego lo notifieque por correo electrónico.

## Storage
- [ ] Obtener los últimos datos de capacidad de la batería y notificar si existe una caida en el voltaje POST /device/storage/alarm (Email Notification Backend Monitoring, Energy fall, etc)
- [ ] Consultar detalles, actualizar o eliminar un dispositivo de almacenamiento GET,PUT,DELETE /device/storage/:storageSN
- [ ] Obtener la última capacidad de la batería GET /device/storage/:id/last
- [ ] Obtener el historial de capacidad de la batería POST /device/storage/history

## Thresholds (DB Needed)
- [ ] POST /device/inverter/voltThreshold 
- [ ] POST /device/inverter/freqThreshold 