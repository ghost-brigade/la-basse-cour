import express from "express";
import * as Response from "../service/Http/Response.js";
import AuthentificationMiddleware from "../middleware/AuthentificationMiddleware.js";
import securityRouter from "../routes/security.js";
import messageRouter from "../routes/message.js";
import userRouter from "./user.js";
import friendRouter from "./friend.js";

const router = express.Router();

router.use(express.json());

router.use(securityRouter);

router.use('/user', AuthentificationMiddleware, userRouter);
router.use('/message', AuthentificationMiddleware, messageRouter);
router.use('/friend', AuthentificationMiddleware, friendRouter);

router.get('*', async (req, res) => {
    return Response.notFound(res);
});

export default router;