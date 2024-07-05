import { Router } from "express";
import * as dataloggerController from "../controllers/thresholdConfig.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router()


router.get('/', verifyToken,dataloggerController.setThresholds)


export default router;