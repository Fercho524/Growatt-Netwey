import { Router } from "express";
import * as dataloggerController from "../controllers/thresholdConfig.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.post('/frequency', verifyToken,growattLogin ,dataloggerController.setFrequencyThreshold)
router.post('/voltaje', verifyToken,growattLogin ,dataloggerController.setVoltageThreshold)


export default router;