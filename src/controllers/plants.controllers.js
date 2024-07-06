import growatt from "../config/gowatt.js"


export const getPlants = async (req, res) => {
    try {
        let getAllPlantData = await growatt.session.getAllPlantData().catch(e => { console.log(e); });
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