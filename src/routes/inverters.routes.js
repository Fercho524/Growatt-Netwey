import { Router } from "express";
import * as dataloggerController from "../controllers/inverters.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken,growattLogin,dataloggerController.listInverters)


export default router;