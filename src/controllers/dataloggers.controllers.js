import growatt from "../config/gowatt.js"


export const getAllDataLoggers = async (req, res) => {
    try {
        let dataloggers = await growatt.api.getDataLoggers()
        res.status(200).json(dataloggers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getDataloggerDetails = async (req, res) => {
    const { sn } = req.params;

    try {
        let dataloggers = await growatt.api.getDataLoggers()
        const logger = dataloggers.find((logger) => logger.sn == sn)
        res.status(200).json(logger);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getDataLoggerRegister = async (req, res) => {
    const { sn } = req.params;

    try {
        const register = await growatt.api.getDataLoggerRegister(sn, 1)
        res.status(200).json(register)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const setDataloggerRegister = async (req, res) => {
    const { sn } = req.params;
    const { addr, value } = req.body;

    try {
        const result = await growatt.session.setDataLoggerRegister(sn, addr, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: `Error updating datalogger with ID ${sn}` });
    }
};