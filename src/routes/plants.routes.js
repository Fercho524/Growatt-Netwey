import { Router } from "express";
import * as plantController from "../controllers/plants.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";


const router = Router()


router.get('/', verifyToken, growattLogin, plantController.getPlants)
router.get('/:id', verifyToken, growattLogin, plantController.getPlantById);
router.post('/:id/history', verifyToken, growattLogin, plantController.getPlantHistory);
router.get('/:id/day', verifyToken, growattLogin, plantController.getPlantDayGeneration);
// router.put('/:id', updatePlant); // Implementar si la funcionalidad está disponible
// router.delete('/:id', deletePlant); // Implementar si la funcionalidad está disponible


export default router;