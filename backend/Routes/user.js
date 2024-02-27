import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
  resetPassword,
  forgotPassword,
  sendQueryToDoctor,
  UpgradeToPremium,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser); // Protected route
router.get("/", getAllUser); // Public route
router.put("/:id", authenticate, restrict(["patient"]), updateUser); // Protectedhdsds route
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser); // Protected route
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile); // Protected route
router.post('/send-query-to-doctor', sendQueryToDoctor);
router.post('/upgrade-to-premium', authenticate, restrict(["patient"]), UpgradeToPremium);

router.get(
  '/appointments/my-appointments', 
  authenticate, 
  restrict(["patient"]), 
  getMyAppointments
);


export default router;
