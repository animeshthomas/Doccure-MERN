import express from "express";
import {
    sendMessageToDoctor,
    sendMessageToUser,
    getChatMessages,
  } from "../Controllers/MessageController.js";
  import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();


router.get("/", getChatMessages);
router.post("/sendToDoctor",authenticate,restrict(["patient"]), sendMessageToDoctor);
router.post("/sendToUser",authenticate,restrict(["doctor"]), sendMessageToUser);

export default router;
