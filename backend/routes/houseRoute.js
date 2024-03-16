import express from "express"
import {
  createHouse,
  getAllHouse,
  getSingleHouse,
  deleteHouse,
  updateHouse,
  deleteMyHouse,
  uploadHousePhoto,
  resize,
} from "./../controller/houseController.js"
import { protect, allowedTO } from "./../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(getAllHouse)
  .post(
    protect,
    allowedTO("landlord", "broker"),
    uploadHousePhoto,
    resize,
    createHouse
  )

router
  .route("/:id")
  .get(getSingleHouse)
  .put(updateHouse)
  .delete(allowedTO("super", "admin"), deleteHouse)
router.route("/deleteMyHouse").delete(deleteMyHouse)

export default router
