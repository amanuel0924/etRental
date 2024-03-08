import express from "express"
import {
  request,
  createFeedBack,
  createHouse,
  getAllHouse,
  getAllfeedback,
  getSingleFeedback,
  getSingleHouse,
  deleteFeedback,
  deleteHouse,
  updateFeedback,
  updateHouse,
} from "./../controller/houseController.js"

const router = express.Router()

router.route("/").get(getAllHouse).post(createHouse)

router.route("/:id").get(getSingleHouse).put(updateHouse).delete(deleteHouse)
router.route("/:id/request").put(request)

router
  .route("/feedback/:id")
  .delete(deleteFeedback)
  .put(updateFeedback)
  .get(getSingleFeedback)
router.route("/feedback").get(getAllfeedback).post(createFeedBack)

export default router