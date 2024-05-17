import express from "express"
import {
  createPending,
  getMyPending,
  getSinglePending,
  acceptPending,
  rejectPending,
  proposeCounterOffer,
  acceptCounterOffer,
  rejectCounterOffer,
  getPendingOrdersForHouse,
  getAllPending,
  getPendingGroupByStatus,
} from "./../controller/pendingOrderController.js"
import { protect, allowedTO } from "./../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .post(protect, allowedTO("renter"), createPending)
  .get(protect, getAllPending)
router.route("/myPending").get(protect, getMyPending)
router.route("/getPendingGroupByStatus").get(protect, getPendingGroupByStatus)
router
  .route("/:id")
  .get(protect, allowedTO("landlord", "renter", "broker"), getSinglePending)
router
  .route("/:id/accept")
  .put(protect, allowedTO("landlord", "broker"), acceptPending)
router
  .route("/:id/reject")
  .put(protect, allowedTO("landlord", "broker"), rejectPending)
router
  .route("/:id/counterOffer")
  .put(protect, allowedTO("landlord", "broker"), proposeCounterOffer)
router
  .route("/:id/acceptCounterOffer")
  .put(protect, allowedTO("renter"), acceptCounterOffer)
router
  .route("/:id/rejectCounterOffer")
  .put(protect, allowedTO("renter"), rejectCounterOffer)
router
  .route("/house/:id")
  .get(protect, allowedTO("landlord", "broker"), getPendingOrdersForHouse)

export default router
