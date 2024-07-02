const express = require('express');

const createPlantsRouter = (apiInstance) => {
    const router = express.Router();

    router.get('/list', async (req, res) => {
        try {
            let getAllPlantData = await apiInstance.getAllPlantData().catch(e => { console.log(e) });
            console.log(getAllPlantData)
            res.json(getAllPlantData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};

module.exports = createPlantsRouter;
