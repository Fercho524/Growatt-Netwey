import growattAPI from "../config/gowatt.js"

export const getPlants = async (req, res) => {
    try {
        let getAllPlantData = await growattAPI.getAllPlantData().catch(e => { console.log(e); });
        console.log(getAllPlantData);
        res.json(getAllPlantData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addPlant = (req, res) => {
    const { name, type } = req.body

    const plant = {
        name: name,
        type: type
    }

    res.status(201)
    res.json(plant)
}