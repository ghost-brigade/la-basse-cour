import express from "express";
import * as AdminController from "../controller/AdminController.js";

const router = express.Router();

router.get('/reports', AdminController.listReports);

router.get('/report/check/:id', AdminController.checkReport);
router.get('/report/ban/:id', AdminController.banReport);

export default router;