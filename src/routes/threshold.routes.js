import { Router } from "express";
import * as dataloggerController from "../controllers/thresholdConfig.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.post('/inverter', verifyToken,growattLogin ,dataloggerController.setInverterParamsThresholds)
router.post('/storage', verifyToken,growattLogin ,dataloggerController.saveStorageDeviceLastData)
router.post('/storageThresholds', verifyToken,growattLogin ,dataloggerController.setStorageDeviceThresholds)


export default router;