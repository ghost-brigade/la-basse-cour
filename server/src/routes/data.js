import express from "express";
import * as DataController from "../controller/DataController.js";

const router = express.Router();

router.get('/', DataController.list);
router.get('/status_count', DataController.statusCount);
router.post('/visit_by_date', DataController.visitByDate);
router.get('/visit_by_hour', DataController.visitByHour);
router.get('/users_by_date', DataController.usersByDate);

export default router;