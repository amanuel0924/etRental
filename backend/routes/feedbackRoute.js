import express from "express"
import {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
} from "./../controller/feedbackController.js"

const router = express.Router()

router
  .route("/feedback/:id")
  .delete(deleteFeedback)
  .put(updateFeedback)
  .get(getSingleFeedback)
router.route("/feedback").get(getAllFeedback).post(createFeedback)

export default router
