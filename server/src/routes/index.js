import express from "express";
import cors from "cors";
import * as Response from "../service/Http/Response.js";
import AuthentificationMiddleware from "../middleware/AuthentificationMiddleware.js";
import { hasRolesAdmin } from "../middleware/AuthorizedMiddleware.js";
import securityRouter from "../routes/security.js";
import messageRouter from "../routes/message.js";
import userRouter from "./user.js";
import friendRouter from "./friend.js";
import profileRouter from "./profile.js";
import discussionRouter from "./discussion.js";
import dataRouter from "./data.js";
import adminRouter from "./admin.js";
import BannedMiddleware from "../middleware/BannedMiddleware.js";

const router = express.Router();

router.use(express.json());
router.use(cors({'origin': true, 'credentials': true}));

router.use(securityRouter);

router.use('/user', AuthentificationMiddleware, userRouter);
router.use('/message', AuthentificationMiddleware, messageRouter);
router.use('/friend', AuthentificationMiddleware, friendRouter);
router.use('/profile', AuthentificationMiddleware, profileRouter);
router.use('/discussion', AuthentificationMiddleware, discussionRouter);
router.use('/data', AuthentificationMiddleware, hasRolesAdmin, dataRouter);
router.use('/admin', AuthentificationMiddleware, hasRolesAdmin, adminRouter);

router.get('*', async (req, res) => {
    return Response.notFound(req, res, "Page not found");
});

export default router;