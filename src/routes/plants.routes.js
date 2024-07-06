import { Router } from "express";
import * as plantController from "../controllers/plants.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";


const router = Router()


router.get('/', verifyToken,growattLogin,plantController.getPlants)
router.post('/add', verifyToken,growattLogin,plantController.addPlant)


export default router;