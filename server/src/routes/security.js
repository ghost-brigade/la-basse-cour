import express from "express";
import * as securityController from "../controller/SecurityController.js";

const router = express.Router();

router.post('/login', securityController.login);
router.post('/register', securityController.register);

export default router;