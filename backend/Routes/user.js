import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
  resetPassword,
  forgotPassword
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser); // Protected route
router.get("/", authenticate, restrict(["admin"]), getAllUser); // Public route
router.put("/:id", authenticate, restrict(["patient"]), updateUser); // Protectedhdsds route
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser); // Protected route
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile); // Protected route

router.get(
  '/appointments/my-appointments', 
  authenticate, 
  restrict(["patient"]), 
  getMyAppointments
);


export default router;
