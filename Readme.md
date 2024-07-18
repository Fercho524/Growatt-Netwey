# Growatt API Endpoints

## Plantas
- [x] Listar plantas : GET /plant/list
- [ ] Añadir planta POST : /plant/add 
- [ ] Detalles de planta, actualizar y eliminar : GET, PUT, DELETE /plant/:id
- [ ] Historial de energía entre 2 fechas : GET /plant/:id/history
- [ ] Generación de energía en un día : GET /plant/:id/day

## Dataloggers
- [x] Ver todos los dataloggers : GET /datalogger/list 
- [ ] Añadir un nuevo datalogger : POST /datalogger/add
- [x] Consultar información, actualizar parámetros, eliminar datalogger: GET, PUT, DELETE /datalogger/:id

## Inversores
- [ ] Lista de inversores : GET /device/:plantID/list
- [ ] Ver detalles, actualizar o eliminar un dispositivo GET,PUT,DELETE /device/inverter/:sn
- [ ] Historial de un inversor entre 2 fechas : POST /device/inverter/:sn/history
- [ ] Ver los últimos datos del inversor : GET /device/inverter/:sn/lastData
- [ ] últimos datos de varios inversores POST /device/inverter/batch

## Storage
- [ ] Últimos datos de la batería (storage): POST /device/storage/:istorageSN
- [ ] Consultar detalles, actualizar o eliminar un dispositivo de almacenamiento GET,PUT,DELETE /device/storage/:storageSN
- [ ] Obtener la última capacidad de la batería GET /device/storage/:id/last
- [ ] Obtener el historial de capacidad de la batería POST /device/storage/history

## Thresholds (DB Needed)
- [ ] POST /device/inverter/voltThreshold 
- [ ] POST /device/inverter/freqThreshold 




# Token de autenticación para la api
# 
# POST localhost:300/api/login
#
# {
# 	"nombre" : "Fernando",
# 	"email" : "fercho.dev@outlook.com",
# 	"apellidos" : "Castro Mendieta"
# }
#
# Authorization : xxxxx


target = 'mrxd9767@gmail.com'
subject = 'Critigs Netwey Alert'
text = 'El correo de prueba funciona, un saludo a toda la gente de Riwanda'
html = '<p>Cuerpo del correo en <strong>HTML</strong></p>'
