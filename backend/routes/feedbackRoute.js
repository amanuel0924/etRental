import express from "express"
import {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
} from "./../controller/feedbackController.js"
import { protect, allowedTO } from "./../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(getAllFeedback)
  .post(protect, allowedTO("renter"), createFeedback)
router
  .route("/:id")
  .delete(deleteFeedback)
  .put(updateFeedback)
  .get(getSingleFeedback)

export default router
