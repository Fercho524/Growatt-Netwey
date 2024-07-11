import { Router } from "express";
import * as dataloggerController from "../controllers/dataloggers.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/list', verifyToken, growattLogin, dataloggerController.listDataLoggers);
router.get('/:id', verifyToken, growattLogin, dataloggerController.getDataLoggerById);
router.put('/:id', verifyToken, growattLogin, dataloggerController.updateDatalogger);
router.delete('/:id', verifyToken, growattLogin, dataloggerController.deleteDatalogger);


export default router;