import { Router } from "express";
import * as inverterController from "../controllers/devices.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken,growattLogin, inverterController.getAllDevices); //  n
router.get('/:sn', verifyToken,growattLogin, inverterController.getDeviceDetails); // y
router.put('/:sn', verifyToken,growattLogin, inverterController.updateDevice); // -
router.post('/:sn/history', verifyToken,growattLogin, inverterController.getDeviceHistory); // y
router.post('/batch', verifyToken,growattLogin, inverterController.getDeviceBatchLastData); // n
router.get('/plant/:plantID', verifyToken,growattLogin, inverterController.getDevicesByPlant); // y


export default router;