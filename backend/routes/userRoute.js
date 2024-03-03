import {
  register,
  getAlluser,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
  deleteUser,
  login,
  logout,
  forgotePassword,
  reset,
} from "../controller/userController.js"
import { protect, admin } from "./../middleware/authMiddleware.js"
import express from "express"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)

router.route("/forgotePassword").post(forgotePassword)
router.route("/resetPassword/:token").put(reset)

router.use(protect)
router.route("/logout").post(logout)
router.route("/profile").put(updateUserProfile).get(getUserProfile)

router.use(admin)
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)
router.route("/").get(getAlluser)

export default router
