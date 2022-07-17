import express from "express";
import * as ProfileController from "../controller/ProfileController.js";

const router = express.Router();

router.post('/update', ProfileController.update);

export default router;