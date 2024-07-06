import growatt from "../config/gowatt.js"


export const listDataLoggers = async (req, res) => {
    try {
        let dataloggers = await growatt.api.getDataLoggers()
        res.status(200).json(dataloggers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const addDataLogger = async (req, res) => {
    // Esta función no está documentada en la API de Growatt
    // Notificar que la función no está disponible
    res.status(501).json({ error: "Adding a datalogger is not supported by the Growatt API" });
};


export const getDataLoggerById = async (req, res) => {
    const { id } = req.params;
    try {
        const logger = await growatt.api.getDataLoggerRegister(id);
        res.status(200).json(logger);
    } catch (error) {
        console.error(`Error fetching datalogger with ID ${id}:`, error);
        res.status(500).json({ error: `Error fetching datalogger with ID ${id}` });
    }
};


export const updateDataLoggerById = async (req, res) => {
    const { id } = req.params;
    const { addr, value } = req.body;
    try {
        const result = await growatt.session.setDataLoggerRegister(id, addr, value);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error updating datalogger with ID ${id}:`, error);
        res.status(500).json({ error: `Error updating datalogger with ID ${id}` });
    }
};


export const deleteDataLoggerById = async (req, res) => {
    // Esta función no está documentada en la API de Growatt
    // Notificar que la función no está disponible
    res.status(501).json({ error: "Deleting a datalogger is not supported by the Growatt API" });
};