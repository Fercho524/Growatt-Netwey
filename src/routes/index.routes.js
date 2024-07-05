import { Router } from "express";
import * as indexController from "../controllers/index.controllers.js";

const router = Router()


router.get('/', indexController.sayHello);


export default router;