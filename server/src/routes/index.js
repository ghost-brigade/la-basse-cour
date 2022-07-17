import express from "express";
import * as Response from "../service/Http/Response.js";
import AuthentificationMiddleware from "../middleware/AuthentificationMiddleware.js";
import { hasRolesAdmin } from "../middleware/AuthorizedMiddleware.js";
import securityRouter from "../routes/security.js";
import messageRouter from "../routes/message.js";
import userRouter from "./user.js";
import friendRouter from "./friend.js";
import profileRouter from "./profile.js";

const router = express.Router();

router.use(express.json());

router.use(securityRouter);

router.use('/user', userRouter);
router.use('/message', AuthentificationMiddleware, messageRouter);
router.use('/friend', AuthentificationMiddleware, friendRouter);
router.use('/profile', AuthentificationMiddleware, profileRouter);

router.get('*', async (req, res) => {
    return Response.notFound(res, "Page not found");
});

export default router;