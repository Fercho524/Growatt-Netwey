import { Router } from "express";
import * as inverterController from "../controllers/inverters.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/:id', verifyToken,growattLogin,inverterController.getInvertersByPlant)


export default router;