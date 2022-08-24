import express from "express";
import * as DiscussionController from "../controller/DiscussionController.js";

const router = express.Router();

router.get('/', DiscussionController.list);
router.post('/create', DiscussionController.create);
router.get('/join/:id', DiscussionController.join);
router.get('/leave/:id', DiscussionController.leave);
router.post('/themes', DiscussionController.listThemes);

export default router;