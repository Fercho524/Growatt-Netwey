import growatt from "../config/gowatt.js"


export const getInvertersByPlant = async (req, res) => {
    try {
        const { plantID } = req.params;
        const options = {
            plantId: plantID,
            deviceData: true,
        };
        const allPlantData = await growatt.api.getAllPlantData(options);
        const inverters = allPlantData[plantID].devices || [];
        res.json(inverters);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los inversores', error });
    }
};


export const getInverterDetails = async (req, res) => {
    try {
        const { sn } = req.params;

        const allPlantData = await growatt.api.getAllPlantData({});
        const inverter = allPlantData.devices[sn] || null;

        if (!inverter) {
            return res.status(404).json({ message: 'Dispositivo no encontrado' });
        }
        res.json(inverter);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles del inversor', error });
    }
};


export const updateInverter = async (req, res) => {
    try {
        const { sn } = req.params;
        const { func, values } = req.body;

        const allPlantData = await growatt.api.getAllPlantData({});
        const type = allPlantData.devices[sn].growattType;
        await growatt.api.setInverterSetting(type, func, sn, values);

        res.json({ message: 'Inversor actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar inversor', error });
    }
};


export const deleteInverter = (req, res) => {
    res.status(501).json({ message: 'Función no soportada por la API de Growatt' });
};


export const getInverterHistory = async (req, res) => {
    try {
        const { sn } = req.params;
        const { startDate, endDate } = req.body;

        const options = {
            historyLastStartDate: new Date(startDate),
            historyLastEndDate: new Date(endDate),
            plantId: sn
        };

        const history = await growatt.api.getAllPlantData(options);

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial del inversor', error });
    }
};

export const getInverterLastData = async (req, res) => {
    try {
        const { sn } = req.params;

        const options = {
            plantId: sn,
            historyLast: true,
        };

        const lastData = await growatt.getAllPlantData(options);
        res.json(lastData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los últimos datos del inversor', error });
    }
};


export const getInvertersBatchData = async (req, res) => {
    try {
        const { snList } = req.body;

        const options = {
            plantId: snList,
            historyLast: true,
        };

        const batchData = await growatt.api.getAllPlantData(options);

        res.json(batchData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los últimos datos de los inversores', error });
    }
};