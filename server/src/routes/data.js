import express from "express";
import * as DataController from "../controller/DataController.js";

const router = express.Router();

router.get('/', DataController.list);
router.get('/status_count', DataController.statusCount);
router.get('/visit_today', DataController.visitToday);
router.get('/visit_by_hour', DataController.visitByHour);

export default router;