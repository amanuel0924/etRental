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
  deleteMe,
  blockUser,
  unBlockUser,
  createUser,
  getUsersByRole,
} from "../controller/userController.js"
import { protect, allowedTO } from "../middleware/authMiddleware.js"
import {
  resizeUser,
  uploadUserPhoto,
} from "./../controller/uploadController.js"
import express from "express"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)

router.route("/forgotePassword").post(forgotePassword)
router.route("/resetPassword/:token").put(reset)
router.route("/getUsersByRole").get(getUsersByRole)

router.use(protect)

router.route("/logout").post(logout)
router
  .route("/profile")
  .put(uploadUserPhoto, resizeUser, updateUserProfile)
  .get(getUserProfile)
  .delete(deleteMe)

router.use(allowedTO("admin", "super"))
router
  .route("/:id")
  .get(getUserById)
  .put(uploadUserPhoto, resizeUser, updateUser)
  .delete(deleteUser)
router.route("/").get(getAlluser)
router.route("/block/:id").put(blockUser)
router.route("/unblock/:id").put(unBlockUser)
router.route("/createUser").post(createUser)

export default router
