# Growatt - Netwey

## 1 Autenticación

### 1.1 Inicio de sesión ✅

```
POST http://localhost:4000/api/auth/login
```

```
{
	"nombre" : "",
	"email" : "",
	"apellidos" : ""
}
```

En cada nueva petición será necesario proporcionar el access token.

```
Headers : {
	"Authorization" : "Access_Token"
}
```


## 2 Gestión de plantas

### 2.1 Ver información de las todas las plantas ✅

```rest
GET http://localhost:4000/api/plants
```

### 2.2 Ver detalles de una planta ✅

```rest
GET http://localhost:4000/api/plants/:plantId
```

### 2.3 Ver historial de una planta ✅

```rest
POST http://localhost:4000/api/plants/:plantId/history

{
	"startDate" : "2024-06-30",
	"endDate" : "2024-07-05"
}
```

### 2.4 Ver historial de un día de la planta ✅

```rest
GET http://localhost:4000/api/plants/:plantId/day?date=2024-07-06
```

### 2.5 Ver historial fallos de una planta ✅

```rest
GET http://localhost:4000/api/plants/:plantId/fault
```

## 3 Gestión de Dataloggers

### 3.1 Ver Dataloggers ✅

```rest
GET http://localhost:4000/api/dataloggers
```

### 3.2 Ver detalles ✅

```rest
GET http://localhost:4000/api/dataloggers/details/:datalogSn
```

### 3.3 Ver registro ✅

```rest
GET http://localhost:4000/api/dataloggers/register/:datalogSn
```

### 3.4 Actualizar registro ✅

```rest
PUT http://localhost:4000/api/dataloggers/register/:datalogSn
```

## 4 Dispositivos

### 4.1 Ver todos los dispositivos ❌

```rest
http://localhost:4000/api/devices
```

Error al pedir datos de todas las plantas.

```rest
Error: {"result":3}
```

### 4.2 Ver detalles del dispositivo ✅

```rest
GET http://localhost:4000/api/devices/TSEFDCD0BE?plantId=2461525
```

### 4.3 Actualizar dispositivo ❔

```rest
PUT http://localhost:4000/api/devices/TSEFDCD0BE
```

### 4.4 Historial del dispositivo ✅

```rest
GET http://localhost:4000/api/devices/TSEFDCD0BE/history

{
	"plantId" : "2461525",
	"startDate" : "2024-07-01",
	"endDate" : "2024-07-03"
}
```

### 4.5 Ver varios dispositivos ❌

```rest
http://localhost:4000/api/devices/batch

{
	"deviceList" : ["TSEFDCD0BE","TSEFDCD0QD"]
}
```

Error al pedir datos de todas las plantas.

```rest
Error: {"result":3}
```

### 4.6 Ver los dispositivos por planta ✅

```rest
GET http://localhost:4000/api/devices/plant/2461525
```

## 5 Configuración de alarmas

### 5.1 Alarmas de inversores ❔

No implementado debido a no encontrar dispositivos de tipo inversor en la cuenta de Netwey

### 5.2 Configurar umbrales de almacenamiento ✅

```rest
POST http://localhost:4000/api/config/storage

{
  "capacity": "75%",
  "usedEnergyToday": "30kWh",
  "vAcInput": "230V",
  "vAcOutput": "220V",
  "fAcInput": "50Hz",
  "fAcOutput": "50Hz",
  "invStatus": "Normal",
  "loadPrecent": "80%",
  "vBat": "48V",
  "temperature": "50C",
  "cycleCount": "500"
}
```

### 5.3 Guardar estado del dispositivo de almacenamiento ✅

```rest
POST http://localhost:4000/api/config/storage

{
  "deviceID": "TSEFDCD0BE",
  "growattType": "storage",
  "capacity": "75%",
  "usedEnergyToday": "30kWh",
  "vAcInput": "230V",
  "vAcOutput": "220V",
  "fAcInput": "50Hz",
  "fAcOutput": "50Hz",
  "invStatus": "Normal",
  "loadPrecent": "80%",
  "vBat": "48V",
  "temperature": "50C",
  "cycleCount": "500"
}
```