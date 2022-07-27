import express from "express";
import * as FriendController from "../controller/FriendController.js";

const router = express.Router();

router.get('/', FriendController.list);
router.post('/', FriendController.update);
router.post('/status', FriendController.status);
router.post('/block', FriendController.block);
router.post('/unblock', FriendController.unblock);

export default router;