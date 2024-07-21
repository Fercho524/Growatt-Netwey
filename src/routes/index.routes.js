import { Router } from "express";
import * as indexController from "../controllers/index.controllers.js";

import { verifyToken } from '../middlewares/auth.middleware.js';
import { growattLogin } from "../middlewares/growattLogin.middleware.js";

const router = Router()


router.get('/', verifyToken, growattLogin, indexController.indexMessage);


export default router;