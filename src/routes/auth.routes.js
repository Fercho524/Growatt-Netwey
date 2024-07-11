import { Router } from "express";
import * as authController from '../controllers/auth.controllers.js'


const router = Router()


router.post('/login', authController.loginUser);


export default router;