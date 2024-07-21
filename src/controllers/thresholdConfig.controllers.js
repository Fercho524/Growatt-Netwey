import {db} from "../config/firebase.js"


export const setStorageDeviceThresholds = async (req, res) => {
    const {
        growattType,
        capacity,
        usedEnergyToday,
        vAcInput,
        vAcOutput,
        fAcInput,
        fAcOutput,
        invStatus,
        loadPrecent,
        vBat,
        temperature,
        cycleCount
    } = req.body;

    try {
        const updateData = {};
        
        if (growattType !== undefined) updateData.growattType = growattType;
        if (capacity !== undefined) updateData.capacity = capacity;
        if (usedEnergyToday !== undefined) updateData.usedEnergyToday = usedEnergyToday;
        if (vAcInput !== undefined) updateData.vAcInput = vAcInput;
        if (vAcOutput !== undefined) updateData.vAcOutput = vAcOutput;
        if (fAcInput !== undefined) updateData.fAcInput = fAcInput;
        if (fAcOutput !== undefined) updateData.fAcOutput = fAcOutput;
        if (invStatus !== undefined) updateData.invStatus = invStatus;
        if (loadPrecent !== undefined) updateData.loadPrecent = loadPrecent;
        if (vBat !== undefined) updateData.vBat = vBat;
        if (temperature !== undefined) updateData.temperature = temperature;
        if (cycleCount !== undefined) updateData.cycleCount = cycleCount;

        const deviceConfig = db.collection('storage_config').doc('global_thresholds');
        await deviceConfig.set(updateData, { merge: true });

        res.json(updateData);
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(501).json({ "error": "Error updating document" });
    }
};


export const saveStorageDeviceLastData = async (req, res) => {
    const {
        deviceID,
        capacity,
        usedEnergyToday,
        vAcInput,
        vAcOutput,
        fAcInput,
        fAcOutput,
        invStatus,
        loadPrecent,
        vBat,
        temperature,
        cycleCount
    } = req.body;

    if (!deviceID) {
        return res.status(400).json({ "error": "deviceID is required" });
    }


    try {
        const updateData = {};
        
        if (capacity !== undefined) updateData.capacity = capacity;
        if (usedEnergyToday !== undefined) updateData.usedEnergyToday = usedEnergyToday;
        if (vAcInput !== undefined) updateData.vAcInput = vAcInput;
        if (vAcOutput !== undefined) updateData.vAcOutput = vAcOutput;
        if (fAcInput !== undefined) updateData.fAcInput = fAcInput;
        if (fAcOutput !== undefined) updateData.fAcOutput = fAcOutput;
        if (invStatus !== undefined) updateData.invStatus = invStatus;
        if (loadPrecent !== undefined) updateData.loadPrecent = loadPrecent;
        if (vBat !== undefined) updateData.vBat = vBat;
        if (temperature !== undefined) updateData.temperature = temperature;
        if (cycleCount !== undefined) updateData.cycleCount = cycleCount;

        const deviceConfig = db.collection('storage_config').doc(deviceID);
        await deviceConfig.set(updateData, { merge: true });

        res.json(updateData);
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(501).json({ "error": "Error updating document" });
    }
};


export const setInverterParamsThresholds = async (req, res) => {
    const { frequency } = req.body
    res.status(501).json({"message":"Funcionalidad no implementada"})
}