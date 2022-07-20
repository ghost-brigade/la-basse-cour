import express from "express";
import * as UserController from "../controller/UserController.js";

const router = express.Router();

router.get('/', UserController.list);

router.get('/:id', UserController.get);

export default router;