import fs from "fs"
import path from "path"
import User from "../model/userModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import sendEmail from "../utils/email.js"
import crypto from "crypto"

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const register = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { name, email, password, phone, role } = req.body

  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }

  const hashedPassword = await hashPassword(password)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role,

    phoneNumber: phone,
  })
  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body
  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  if (req.user.role === "super" && role === "super") {
    res.status(400)
    throw new Error("you can't register as super ")
  }
  if (req.user.role === "admin" && (role === "super" || role === "admin")) {
    res.status(400)
    throw new Error("admin can't register an admin or super admin")
  }
  const hashedPassword = await hashPassword(password)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role,
    verified: true,
    phoneNumber: phone,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  console.log(req.body)
  const user = await User.findOne({ email }).select("+active")

  if (user && (await bcrypt.compare(password, user.password))) {
    //handel if user is not active return error
    if (!user?.active) {
      res.status(401)
      throw new Error("Your account is deactivated, please contact admin")
    }

    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("accessToken", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res.cookie("refreshToken", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ message: "logout successfuly" })
})

export const getAlluser = asyncHandler(async (req, res, next) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const queryObj = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}
  const count = await User.countDocuments(queryObj)
  const users = await User.find(queryObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .select("-password")
  if (!users) {
    res.status(404)
    throw new Error("No user found")
  }

  res.status(200).json({
    results: users.length,
    page,
    pages: Math.ceil(count / pageSize),
    users,
  })
})

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      image: user.image,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password, image, phone } = req.body
  let updatedUser = await User.findById(req.user._id)
  if (!updatedUser) {
    res.status(404)
    throw new Error("User not found")
  }

  let updatedFields = {}
  if (name) updatedFields.name = name
  if (email) updatedFields.email = email
  if (image) updatedFields.image = image
  if (phone) updatedFields.phoneNumber = phone
  if (password) {
    const salt = await bcrypt.genSalt(10)
    updatedFields.password = await bcrypt.hash(password, salt)
  }
  if (req.file && updatedUser.image !== "default.jpg") {
    const imagePath = path.join(
      "..",
      "backend",
      "uploads",
      "user",
      updatedUser.image
    )
    await fs.promises.unlink(imagePath)
  }
  updatedUser = await User.findByIdAndUpdate(req.user._id, updatedFields, {
    new: true,
    runValidators: false,
  })
  if (updatedUser) {
    generateToken(res, updatedUser._id)
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image,
      phoneNumber: updatedUser.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
export const deleteMe = asyncHandler(async (req, res, next) => {
  if (req.user.role === "super") {
    res.status(404)
    throw new Error("you can't delete super admin")
  }
  if (req.user.role === "admin") {
    res.status(404)
    throw new Error("you can't delete admin")
  }
  await User.findByIdAndUpdate(req.user._id, { active: false })

  res.status(200).json({
    message: "you are deleted successuly",
  })
})

export const deactivateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }
  await User.findByIdAndUpdate(user._id, { active: true })

  res.status(200).json({
    message: "user is deactivated successuly",
  })
})

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }
  if (user.role === "super") {
    res.status(404)
    throw new Error("you can't delete super admin")
  }
  if (user.role === "admin" && req.user.role !== "super") {
    res.status(404)
    throw new Error("you have not permisstion to delete  admin")
  }

  if (user.image !== "default.jpg") {
    const imagePath = path.join("..", "backend", "uploads", "user", user.image)

    await fs.promises.unlink(imagePath)
  }

  await User.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: "User removed" })
})

export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, image, phone } = req.body
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  if (user.role === "admin" && req.user.role !== "super") {
    res.status(404)
    throw new Error("you have not permisstion to update  admin")
  }

  if (req.file && user.image !== "default.jpg") {
    const imagePath = path.join("..", "backend", "uploads", "user", user.image)
    await fs.promises.unlink(imagePath)
  }
  user.name = name || user.name
  user.email = email || user.email
  user.image = image || user.image
  user.phoneNumber = phone || user.phoneNumber
  const updatedUser = await user.save()
  res.status(200).json(updatedUser)
})
export const blockUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }
  if (user.role === "super") {
    res.status(404)
    throw new Error("you can't block super admin")
  }
  if (user.role === "admin" && req.user.role !== "super") {
    res.status(404)
    throw new Error("you have not permisstion to block  admin")
  }
  user.block = true
  user.blocker = req.user._id
  const updatedUser = await user.save()
  res.status(200).json(updatedUser)
})

export const unBlockUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  if (!user.role === "super" || req.user._id === user.blocker) {
    res.status(404)
    throw new Error("you have not permisstion to unblock  admin")
  }
  user.block = false
  user.blocker = undefined
  const updatedUser = await user.save()
  res.status(200).json(updatedUser)
})

export const forgotePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    res.status(404)
    throw new Error("user not found by this email")
  }
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetToken}`
  const message = `Forgot your password? submit a put request with your new password : ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    })
    res.status(200).json({ message: "Token sent to email!" })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpiers = undefined
    await user.save({ validateBeforeSave: false })
    console.log(error)
    res.status(500)
    throw new Error("There was an error sending the email")
  }
})

export const reset = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiers: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error("Token is invalid or has expired")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  user.password = hashedPassword
  user.passwordResetToken = undefined
  user.passwordResetExpiers = undefined
  await user.save()

  res.status(200).json({ message: "password reset successfully" })
})
