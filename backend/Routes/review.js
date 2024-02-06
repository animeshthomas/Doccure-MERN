import express from "express";
import { getAllReviews, createReview, getDoctorReviews } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

// GET all reviews and POST a new review
router.route("/")
  .get(getAllReviews)
  .post(authenticate, createReview);

// GET reviews for a specific doctor
router.route("/doctor/:doctorId/reviews")
  .get(getDoctorReviews);

export default router;
