import { Router } from "express";
import * as inverterController from "../controllers/devices.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken,growattLogin, inverterController.getAllDevices);
router.get('/:sn', verifyToken,growattLogin, inverterController.getDeviceDetails);
router.post('/batch', verifyToken,growattLogin, inverterController.getDeviceBatchLastData);
router.post('/:sn/history', verifyToken,growattLogin, inverterController.getDeviceHistory);
router.put('/:sn', verifyToken,growattLogin, inverterController.updateDevice);


router.get('/:plantID/devices', verifyToken,growattLogin, inverterController.getDeviceDetails);


export default router;