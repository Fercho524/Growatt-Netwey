import { Router } from "express";
import * as dataloggerController from "../controllers/storage.controllers.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router()


router.get('/', verifyToken,dataloggerController.listStorage)


export default router;