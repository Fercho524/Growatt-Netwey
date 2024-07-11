import { Router } from "express";
import * as inverterController from "../controllers/inverters.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/device/:plantID/list', verifyToken,growattLogin, invertersController.getInvertersByPlant);
router.get('/device/inverter/:sn', verifyToken,growattLogin, invertersController.getInverterDetails);
router.put('/device/inverter/:sn', verifyToken,growattLogin, invertersController.updateInverter);
router.delete('/device/inverter/:sn', verifyToken,growattLogin, invertersController.deleteInverter);
router.post('/device/inverter/:sn/history', verifyToken,growattLogin, invertersController.getInverterHistory);
router.get('/device/inverter/:sn/lastData', verifyToken,growattLogin, invertersController.getInverterLastData);
router.post('/device/inverter/batch', verifyToken,growattLogin, invertersController.getInvertersBatchData);


export default router;