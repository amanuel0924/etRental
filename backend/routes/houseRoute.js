import express from "express"
import {
  requestToRent,
  createHouse,
  getAllHouse,
  getSingleHouse,
  deleteHouse,
  updateHouse,
} from "./../controller/houseController.js"
import { protect, admin } from "./../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getAllHouse).post(protect, createHouse)

router.route("/:id").get(getSingleHouse).put(updateHouse).delete(deleteHouse)
router.route("/:id/request").post(requestToRent)

export default router
