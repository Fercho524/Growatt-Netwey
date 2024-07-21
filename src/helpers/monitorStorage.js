import axios from "axios";


import { sendMail } from "./sendMail.js";

import { getPlants } from "./GrowattToken.js";
import { getToken } from "./GrowattToken.js";
import { accessToken } from "./GrowattToken.js";
import { db, admin } from "../config/firebase.js";


const getGlobalThresholds = async () => {
    const doc = await db.collection('storage_config').doc('global_thresholds').get();
    return doc.exists ? doc.data() : {};
};



const checkStorageParams = async (token = null, plantID) => {
    if (!token) {
        let token = await getToken();
    }

    try {
        const response = await axios.get(
            `${process.env.GROWATT_HOST}/api/device/inverters/${plantID}/lastData`,
            {
                headers: {
                    "Authorization": `${accessToken}`,
                    'Access-Control-Allow-Origin': '*',
                },
                timeout: 500000
            }
        );

        if (response.status === 403) {
            token = await getToken();
            if (token) {
                return checkStorageParams(token, plantID);
            } else {
                return [];
            }
        }

        const responseData = response.data
        const plantIDs = Object.keys(responseData)
        const plantLastData = responseData[plantIDs[0]]
        const deviceIDs = Object.keys(plantLastData.devices)

        const globalThresholds = await getGlobalThresholds();

        deviceIDs.forEach(async (deviceID) => {
            const device = plantLastData.devices[deviceID]

            const currentState = {
                sn: deviceID,
                growattType: device.growattType,
                capacity: device.statusData.capacity,
                usedEnergyToday: device.totalData.useEnergyToday,
                vAcInput: device.statusData.vAcInput,
                vAcOutput: device.statusData.vAcOutput,
                fAcInput: device.statusData.fAcInput,
                fAcOutput: device.statusData.fAcOutput,
                invStatus: device.statusData.invStatus,
                loadPrecent: device.statusData.loadPrecent,
                vBat: device.historyLast.vBat,
                temperature: device.historyLast.temperature,
                cycleCount: device.historyLast.cycleCount,
            }

            // Comparar currentState con globalThresholds y enviar alerta si es necesario
            let alertMessage = '';
            for (const key in globalThresholds) {
                if (currentState[key] !== undefined && parseFloat(currentState[key]) > parseFloat(globalThresholds[key])) {
                    alertMessage += `Alert: ${key} value ${currentState[key]} exceeds threshold ${globalThresholds[key]}\n`;
                }
            }

            if (alertMessage) {
                await sendMail(process.env.ALERT_EMAIL, 'Growatt Device Alert', alertMessage, `<pre>${alertMessage}</pre>`);
            }

            // Guardar el estado actual en Firebase
            const deviceConfig = db.collection('storage_config').doc(deviceID);
            await deviceConfig.set(currentState, { merge: true });
        })
    } catch (error) {
        console.error('Error al obtener la lista de plantas:');
        return [];
    }
};


const executeInParallel = async (plantIDs) => {
    const tasks = plantIDs.map(plantID => checkStorageParams(plantID));
    await Promise.all(tasks);
};


const startPeriodicExecution = async (plantIDs, interval) => {
    while (true) {
        await executeInParallel(plantIDs);
        console.log('All IDs have been printed.');
        await new Promise(resolve => setTimeout(resolve, interval));
    }
};


const main = async () => {
    console.log("Plantas a monitorear");
    const plants = await getPlants(accessToken);
    const ids = Object.keys(plants);

    console.log(ids);

    const interval = 60 * 5 * 1000; // 5 minutes in milliseconds

    await startPeriodicExecution(ids, interval);
};

main();