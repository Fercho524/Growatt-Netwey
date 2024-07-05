import { Router } from "express";
import * as dataloggerController from "../controllers/dataloggers.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router()


router.get('/', verifyToken,dataloggerController.listDataLoggers)


export default router;