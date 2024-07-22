import axios from "axios";
import { sendMail } from "./sendMail.js";
import { getPlants } from "./GrowattToken.js";
import { getToken } from "./GrowattToken.js";
import { ACCESS_TOKEN } from "./GrowattToken.js";
import { db } from "../config/firebase.js";


const cleanObject = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};


const getGlobalThresholds = async () => {
    const doc = await db.collection('storage_config').doc('global_thresholds').get();
    return doc.exists ? doc.data() : {};
};


const checkStorageParams = async (token = ACCESS_TOKEN, plantID) => {
    if (!token) {
        token = await getToken();
    }

    try {
        console.log(`Monitoreando planta ${plantID}`);

        const response = await axios.get(
            `${process.env.GROWATT_HOST}/api/devices/plant/${plantID}`,
            {
                headers: {
                    "Authorization": `${token}`,
                    'Access-Control-Allow-Origin': '*',
                },
                timeout: 500000
            }
        );

        if (response.status === 403) {
            console.log("Token vencido, obteniendo nuevo token");

            ACCESS_TOKEN = await getToken();
            token = ACCESS_TOKEN;
            if (token) {
                return checkStorageParams(token, plantID);
            } else {
                return [];
            }
        }

        const responseData = response.data;
        const deviceIDs = Object.keys(responseData);
        const globalThresholds = await getGlobalThresholds();

        console.log("Dispositivos de la planta ", plantID, ":");
        console.log(deviceIDs);

        deviceIDs.forEach(async (deviceID) => {
            const device = responseData[deviceID];
            
            // Fecha
            const hora = new Date()
            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
            const horaFormateada = hora.toLocaleTimeString('es-MX', options);


            const currentState = {
                sn: deviceID,
                capacity: device.statusData?.capacity,
                usedEnergyToday: device.totalData?.useEnergyToday,
                vAcInput: device.statusData?.vAcInput,
                vAcOutput: device.statusData?.vAcOutput,
                fAcInput: device.statusData?.fAcInput,
                fAcOutput: device.statusData?.fAcOutput,
                invStatus: device.statusData?.invStatus,
                loadPrecent: device.statusData?.loadPrecent,
                vBat: device.historyLast?.vBat,
                temperature: device.historyLast?.temperature,
                cycleCount: device.historyLast?.cycleCount,
                date: new Date().toLocaleDateString('en-CA'),
                hour : hora
            };

            const cleanedState = cleanObject(currentState);
            console.log(cleanedState);

            // Comparar cleanedState con globalThresholds y enviar alerta si es necesario
            let alertMessage = '';

            try {
                console.log("Comparando estado actual")

                for (const key in globalThresholds) {
                    if (cleanedState[key] !== undefined && parseFloat(cleanedState[key]) > parseFloat(globalThresholds[key])) {
                        alertMessage += `Alert: ${key} value ${cleanedState[key]} exceeds threshold ${globalThresholds[key]}\n`;
                    }
                }
            } catch (error) {
                console.log("Hubo un error al monitorear", error);
            }

            console.log(alertMessage);

            // Lógica para enviar EMAIL
            if (alertMessage) {
                await sendMail('growatt.netwey@jaknet.com', 'Growatt Device Alert', alertMessage, `<pre>${alertMessage}</pre>`);
            }

            if (cleanedState) {
                // Guardar el estado actual en Firebase
                const deviceConfig = db.collection('storage_config').doc(deviceID);
                await deviceConfig.set(cleanedState, { merge: true });
            }
        });
    } catch (error) {
        console.error('Error al monitorear la planta ', plantID);
        return [];
    }
};

const executeInParallel = async (plantIDs) => {
    const tasks = plantIDs.map(plantID => checkStorageParams(ACCESS_TOKEN, plantID));
    await Promise.all(tasks);
};

const startPeriodicExecution = async (plantIDs, interval) => {
    while (true) {
        await executeInParallel(plantIDs);
        console.log('Los dispositivos de todas las plantas han sido monitoreados, las alertas se han enviado por correo electrónico');
        await new Promise(resolve => setTimeout(resolve, interval));
    }
};

const main = async () => {
    console.log("Plantas a monitorear");
    const plants = await getPlants(ACCESS_TOKEN);
    const plantIDs = Object.keys(plants);

    console.log(plantIDs);

    const interval = 60 * 5 * 1000; // 5 minutes in milliseconds

    await startPeriodicExecution(plantIDs, interval);
};

main();