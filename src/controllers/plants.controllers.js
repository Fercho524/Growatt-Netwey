import growatt from "../config/gowatt.js"


export const getPlantList = async (req, res) => {
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


export const getPlantDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const options = { 
            plantId: id, 
            plantData: true, 
            deviceData: false, 
            weather: false, 
            faultlog: false 
        };
        const plant = await growatt.api.getAllPlantData(options);
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching plant details' });
    }
};


export const getPlantDayGeneration = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;
    
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


export const getPlantGenerationHistory = async (req, res) => {
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


export const getPlantFaultLog = async (req, res) => {
    const {plantID, date,sn,page} = req.body;

    try {
        const options = {
            plantId: plantID, 
            plantData: true, 
            deviceData: false, 
            weather: false, 
            faultlog: true 
        };
        
        // Decidir entre estas 2
        const plant = await growatt.api.getAllPlantData(options);
        const plantFault = await growatt.api.getNewPlantFaultLog(plantID,date,sn,page)
        
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching plant details' });
    }
};


export const getPlantDeviceLastData = async (req, res) => {
    try {
        const { plantID } = req.params;

        const options = {
            plantId: plantID,
            historyLast: true,
        };

        const lastData = await growatt.api.getAllPlantData(options);
        res.json(lastData);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los últimos datos del inversor', error });
    }
};


export const getAllPlantsDeviceLastData = async (req, res) => {
    try {
        const options = {
            plantData: true,
            deviceData: true,
            weather: false,
            faultlog: true,
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