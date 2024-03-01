import express from "express";
import {
    sendMessageToDoctor,
    sendMessageToUser,
    getChatMessages,
    getAllPatients
  } from "../Controllers/MessageController.js";
  import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();


router.post("/", getChatMessages);
router.post("/sendToDoctor",sendMessageToDoctor);
router.post("/sendToUser", sendMessageToUser);
router.get("/getAllPatients/:doctorId/",getAllPatients);

export default router;
