import growatt from "../config/gowatt.js"


export const getAllDevices = async (req, res) => {
    try {
        const options = {
            plantData: true,
            deviceData: true,
            weather: false,
            faultlog: false,
            historyLast: false,
            statusData: false,
        };

        let plants = await growatt.api.getAllPlantData(options)

        let devices = []

        for (let plant of Object.keys(plants)) {
            for (let deviceId of Object.keys(plants[plant].devices)) {
                devices.push(plants[plant].devices[deviceId])
            }
        }

        console.log(devices)

        res.json(devices)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener detalles del inversor', error });
    }
};


export const getDeviceDetails = async (req, res) => {
    try {
        const { sn } = req.params;

        const plants = await growatt.api.getAllPlantData({
            deviceData: true,
            plantData: false,
            weather: false,
            statusData: false,
            historyLast: false
        });

        let devices = []

        for (let plant of Object.keys(plants)) {
            for (let deviceId of Object.keys(plants[plant].devices)) {
                devices.push(plants[plant].devices[deviceId])
            }
        }

        let device = devices.find((dev) => { return dev.deviceData.sn == sn })

        if (!device) {
            return res.status(404).json({ message: 'Dispositivo no encontrado' });
        }

        res.json(device)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener detalles del inversor', error });
    }
};


export const getDevicesByPlant = async (req, res) => {
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
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los inversores', error });
    }
};


export const getDeviceBatchLastData = async (req, res) => {
    try {
        const { deviceList } = req.body

        const plants = await growatt.api.getAllPlantData({
            deviceData: true,
            plantData: false,
            weather: false,
            statusData: false,
            historyLast: true
        });

        let deviceData = []

        for (let plant of Object.keys(plants)) {
            for (let deviceId of Object.keys(plants[plant].devices)) {
                if (deviceList.includes(deviceId)) {
                    deviceData.push(plants[plant].devices[deviceId])
                }
            }
        }

        res.json(deviceData)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener detalles del inversor', error });
    }
};


export const getDeviceHistory = async (req, res) => {
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
        console.log(error)
        res.status(500).json({ message: 'Error al obtener el historial del inversor', error });
    }
};


export const updateDevice = async (req, res) => {
    try {
        const { sn } = req.params;
        const { func, values } = req.body;

        const allPlantData = await growatt.api.getAllPlantData({});
        const type = allPlantData.devices[sn].growattType;
        await growatt.api.setInverterSetting(type, func, sn, values);

        res.json({ message: 'Inversor actualizado correctamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al actualizar inversor', error });
    }
};