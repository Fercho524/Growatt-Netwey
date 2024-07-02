# Growatt API Endpoints

GET /plant/list
POST /plant/add 
GET,PUT,DELETE /plant/:id
POST /plant/:id/history
GET /plant/:id/day

GET /datalogger/list
POST /datalogger/add
GET,PUT,DELETE /datalogger/:id

GET /device/:plantID/list
GET,PUT,DELETE /device/inverter/:sn
POST /device/inverter/:sn/history
GET /device/inverter/:sn/alarm (Email Notification Backend Monitoring. Voltage, Frequency, etc)
GET /device/inverter/:sn/lastData
POST /device/inverter/batch

POST /device/storage/alarm (Email Notification Backend Monitoring, Energy fall, etc)
GET,PUT,DELETE /device/storage/:storageSN
GET /device/storage/:id/last
POST /device/storage/history

POST /device/inverter/voltThreshold 
POST /device/inverter/freqThreshold 


