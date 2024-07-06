import { Router } from "express";
import * as dataloggerController from "../controllers/thresholdConfig.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken,growattLogin ,dataloggerController.setThresholds)


export default router;