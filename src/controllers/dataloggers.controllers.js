import growatt from "../config/gowatt.js"


export const listDataLoggers = async (req, res) => {
    try {
        let dataloggers = await growatt.api.getDataLoggers()
        res.status(200).json(dataloggers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getDataLoggerById = async (req, res) => {
    const { id: sn } = req.params;
    try {
        let dataloggers = await growatt.api.getDataLoggers()
        const logger = dataloggers.find((logger) => logger.sn == sn)
        res.status(200).json(logger);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateDataLoggerById = async (req, res) => {
    const { id } = req.params;
    const { addr, value } = req.body;

    try {
        const result = await growatt.session.setDataLoggerRegister(id, addr, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: `Error updating datalogger with ID ${id}` });
    }
};


export const deleteDatalogger = (req, res) => {
    res.status(501).json({ message: 'Función no soportada por la API de Growatt' });
};