import growatt from "../config/gowatt.js"

export const getInvertersByPlant = async (req, res) => {
    try {
        const { plantID } = req.params;
        const devices = await growatt.api.getDevicesByPlant(plantID);
        const inverters = devices.filter((device) => device.growattType == "inverter")
        res.json(inverters);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los inversores', error });
    }
};

