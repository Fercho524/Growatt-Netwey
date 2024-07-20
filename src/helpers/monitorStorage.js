import axios from "axios";

import { sendMail } from "./sendMail.js";

import { getPlants } from "./GrowattToken.js";
import { getToken } from "./GrowattToken.js";
import { accessToken } from "./GrowattToken.js";
import { db, admin } from "../config/firebase.js";



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
                return checkStorageParams(token,plantID);
            } else {
                return [];
            }
        }

        const responseData = response.data
        const plantIDs = Object.keys(responseData)
        const plantLastData = responseData[plantIDs[0]]
        const deviceIDs = Object.keys(plantLastData.devices)

        deviceIDs.forEach((deviceID) => {
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

            // If not state in firebase
            //  saveInfo in Firebase
            // Else
            //  get storage config
            // 
            // get oldState
            // compare oldState with currentState
            //
            // if variations
            //  sendAlert
            //
            // saveInfo in Firebase
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



console.log("Plantas a monitorear")
const plants = await getPlants()
const ids = Object.keys(plants)

console.log(ids)

const history = {}
const interval = 60 * 5;
const threshold = 60.0;


const storageParams = await checkStorageParams(ids[0])
console.log(storageParams)


//startPeriodicExecution(ids, interval);