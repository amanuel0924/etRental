import express from "express"
import {
  createHouse,
  getAllHouse,
  getSingleHouse,
  deleteHouse,
  updateHouse,
  deleteMyHouse,
  createBrokersRequest,
  acceptBrokerRequest,
  rejectBrokerRequest,
  getMyHouse,
  lockAndUnlockHouse,
  createFeedback,
  makeHouseAvailable,
  getAllHouseforAdmin,
  getHouseCountByStatus,
} from "./../controller/houseController.js"
import { protect, allowedTO } from "./../middleware/authMiddleware.js"
import { uploadHousePhoto, resize } from "./../controller/uploadController.js"

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
  .route("/myHouse")
  .get(protect, allowedTO("broker", "landlord"), getMyHouse)
router.route("/getHouseCountByStatus").get(protect, getHouseCountByStatus)

router
  .route("/allHouse")
  .get(protect, allowedTO("super", "admin"), getAllHouseforAdmin)

router
  .route("/sendBrokersRequest/:id")
  .post(protect, allowedTO("broker"), createBrokersRequest)
router
  .route("/acceptBrokerRequest")
  .post(protect, allowedTO("landlord"), acceptBrokerRequest)
router
  .route("/rejectBrokerRequest")
  .post(protect, allowedTO("landlord"), rejectBrokerRequest)

router
  .route("/lockAndUnlockHouse/:id")
  .put(protect, allowedTO("broker", "landlord"), lockAndUnlockHouse)

router.route("/makeHouseAvailable/:id").put(protect, makeHouseAvailable)
router
  .route("/:id")
  .get(protect, getSingleHouse)
  .put(protect, uploadHousePhoto, resize, updateHouse)
  .delete(protect, allowedTO("super", "admin"), deleteHouse)
router.route("/createFeedback/:id").post(protect, createFeedback)

router
  .route("/deleteMyHouse/:id")
  .delete(protect, allowedTO("landlord", "broker"), deleteMyHouse)

export default router
