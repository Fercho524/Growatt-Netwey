import { Router } from "express";

import * as dataloggerController from "../controllers/dataloggers.controllers.js";

import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken, growattLogin, dataloggerController.getAllDataLoggers);
router.get('/details/:sn', verifyToken, growattLogin, dataloggerController.getDataloggerDetails);
router.get('/register/:sn',verifyToken, growattLogin,dataloggerController.getDataLoggerRegister)
router.put('/register/:sn',verifyToken, growattLogin,dataloggerController.setDataloggerRegister)


export default router;