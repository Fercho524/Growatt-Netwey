import { Router } from "express";
import * as inverterController from "../controllers/inverters.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/list', verifyToken,growattLogin, inverterController.getAllInverters);
router.get('/:plantID/list', verifyToken,growattLogin, inverterController.getInvertersByPlant);
router.get('/:sn', verifyToken,growattLogin, inverterController.getInverterDetails);
router.put('/:sn', verifyToken,growattLogin, inverterController.updateInverter);
router.delete('/:sn', verifyToken,growattLogin, inverterController.deleteInverter);
router.post('/:sn/history', verifyToken,growattLogin, inverterController.getInverterDetails);
router.get('/:sn/lastData', verifyToken,growattLogin, inverterController.getInverterLastData);
router.post('/batch', verifyToken,growattLogin, inverterController.getInvertersBatchData);


export default router;