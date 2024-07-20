import growatt from "../config/gowatt.js"


export const getPlants = async (req, res) => {
    try {
        const options = {
            plantData: true,
            deviceData: false,
            weather: false,
            faultlog: false,
            historyLast: false,
            statusData: false,
        };
        let getAllPlantData = await growatt.api.getAllPlantData(options)
        res.json(getAllPlantData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getPlantById = async (req, res) => {
    const { id } = req.params;
    try {
        const options = { plantId: id, plantData: true, deviceData: false, weather: false, faultlog: false };
        const plant = await growatt.api.getAllPlantData(options);
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching plant details' });
    }
};


export const getPlantHistory = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    try {
        const options = {
            plantId: id,
            historyAll: true,
            historyLastStartDate: new Date(startDate),
            historyLastEndDate: new Date(endDate)
        };
        const history = await growatt.api.getAllPlantData(options);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching plant history' });
    }
};


export const getPlantDayGeneration = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;  // Assuming date is passed as a query parameter in 'YYYY-MM-DD' format
    try {
        const options = {
            plantId: id,
            historyAll: true,
            historyLastStartDate: new Date(date),
            historyLastEndDate: new Date(new Date(date).setDate(new Date(date).getDate() + 1))  // End date is the next day
        };
        const generationData = await growatt.api.getAllPlantData(options);
        res.status(200).json(generationData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching daily generation data' });
    }
};


export const getPlantsLastData = async (req, res) => {
    try {
        const options = {
            plantData: true,
            deviceData: true,
            weather: false,
            faultlog: false,
            historyLast: true,
            statusData: false,
        };

        let allPlantsLastData = await growatt.api.getAllPlantData()
        res.json(allPlantsLastData);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};