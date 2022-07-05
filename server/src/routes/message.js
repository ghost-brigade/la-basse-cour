import express from "express";
import * as MessageController from "../controller/MessageController.js";

const router = express.Router();

router.get('/', MessageController.list);
router.post('/', MessageController.create);

router.get('/:id', MessageController.item);
router.put('/:id', MessageController.update);
router.delete('/:id', MessageController.remove);

export default router;