import { Router } from "express";
import * as dataloggerController from "../controllers/dataloggers.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken, growattLogin, dataloggerController.listDataLoggers)
router.get('/:id', verifyToken, growattLogin, dataloggerController.getDataLoggerById);
router.put('/:id', verifyToken, growattLogin, dataloggerController.updateDataLoggerById);


export default router;