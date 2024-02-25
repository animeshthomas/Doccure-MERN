import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
  searchDoctor,
  unapprovedDoctors,
  approveDoctor
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

router.use("/:doctorId/reviews", reviewRouter);
router.get("/unapproved", unapprovedDoctors); // Handle unapproved doctors before specific doctor route
router.get("/:id", getSingleDoctor); // Handle specific doctor by ID
router.put("/approve/:id", approveDoctor); // Handle specific doctor by ID
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get("/searchresult",searchDoctor);

export default router;
