import { Router } from "express";
import * as dataloggerController from "../controllers/inverters.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router()


router.get('/', verifyToken,dataloggerController.listInverters)


export default router;