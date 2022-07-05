import express from "express";
import securityRouter from "../routes/security.js";
import messageRouter from "../routes/message.js";
import userRouter from "./user.js";
import AuthentificationMiddleware from "../middleware/AuthentificationMiddleware.js";
import * as Response from "../service/Http/Response.js";

const router = express.Router();

router.use(express.json());

router.use(securityRouter);

router.use('/user', userRouter);
router.use('/message', AuthentificationMiddleware, messageRouter);

router.get('*', async (req, res) => {
    return Response.notFound(res);
});

export default router;