import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "./../model/userModel.js"

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("you are not logged in")
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
