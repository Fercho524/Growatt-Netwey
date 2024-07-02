const express = require('express');
const createPlantsRouter = require('./plants');

const createRouter = (apiInstance) => {
    const router = express.Router();

    router.use('/plants', createPlantsRouter(apiInstance));

    return router;
};

module.exports = createRouter;
