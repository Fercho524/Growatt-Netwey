import { Router } from "express";
import * as plantController from "../controllers/plants.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router()


router.get('/', verifyToken,plantController.getPlants)
router.post('/add', verifyToken,plantController.addPlant)


export default router;