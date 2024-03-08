import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "./../model/userModel.js"
import { renewToken } from "../utils/generateToken.js"

const protect = asyncHandler(async (req, res, next) => {
  let accessToken
  accessToken = req.cookies.accessToken
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }
  if (!accessToken) {
    const { exist, id } = renewToken(req, res)
    if (exist) {
      req.user = await User.findById(id).select("-password")
      next()
    } else {
      res.status(401)
      throw new Error("you are not logged in")
    }
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin")
  }
}

export { protect, admin }
