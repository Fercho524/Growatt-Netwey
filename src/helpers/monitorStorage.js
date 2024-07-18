// const monitorFreqOutput = async () => {
//     try {
//         const response = await axios.get(`http://localhost:4000/api/device/inverters/${plantID}/lastData`);
//         const data = response.data;
//         const freqOutPut = data[plantID].devices["TSEFDCD0BE"].historyLast.freqOutPut;

//         console.log(`Frecuencia de salida actual: ${freqOutPut} Hz`);

//         if (freqOutPut > threshold) {
//             console.log(`Alerta: Frecuencia de salida (${freqOutPut} Hz) supera el umbral (${threshold} Hz)`);
//             sendMail(
//                 'mrxd9767@gmail.com',
//                 'Netwey',
//                 `Alerta: Frecuencia de salida (${freqOutPut} Hz) supera el umbral (${threshold} Hz)`,
//                 `Alerta: Frecuencia de salida (${freqOutPut} Hz) supera el umbral (${threshold} Hz)`
//             );
//         }
//     } catch (error) {
//         console.error('Error al obtener los datos:', error);
//     }
// };

import axios from "axios";

import { sendMail } from "./sendMail.js";

import { getPlants } from "./GrowattToken.js";
import { getToken } from "./GrowattToken.js";


const checkStorageParams = async (id) => {
    console.log(`Printing ID: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 100));
};

const executeInParallel = async (ids) => {
    const tasks = ids.map(id => checkStorageParams(id));
    await Promise.all(tasks);
};

const startPeriodicExecution = async (ids, interval) => {
    while (true) {
        await executeInParallel(ids);
        console.log('All IDs have been printed.');
        await new Promise(resolve => setTimeout(resolve, interval));
    }
};


// Todo esto se guardará y dependerá de firebase
const plants = await getPlants()
const ids = Object.keys(ids)
const history = {}
const interval = 60*5;
const threshold = 60.0;


startPeriodicExecution(ids, interval);