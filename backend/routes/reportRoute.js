import {
  createReport,
  getReportsForhouse,
  getMyReports,
  resolveReport,
} from "../controller/reportController.js"
import { protect, allowedTO } from "../middleware/authMiddleware.js"
import express from "express"

const router = express.Router()

router.route("/").post(protect, createReport)
router
  .route("/myReports")
  .get(protect, allowedTO("renter", "broker", "landlord"), getMyReports)
router
  .route("/house/:id")
  .get(protect, allowedTO("broker", "landlord"), getReportsForhouse)

router
  .route("/resolve/:id")
  .put(protect, allowedTO("broker", "landlord"), resolveReport)

export default router
