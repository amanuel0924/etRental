import User from "../model/userModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import sendEmail from "../utils/email.js"
import crypto from "crypto"

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })
  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
  const users = await User.find({}).select("-password")

  res.status(200).json(users)
})

export const getUserProfile = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  const user = await User.findById(req.user.id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const updatedFields = {}
  if (name) updatedFields.name = name
  if (email) updatedFields.email = email
  if (password) {
    const salt = await bcrypt.genSalt(10)
    updatedFields.password = await bcrypt.hash(password, salt)
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  )
  if (updatedUser) {
    generateToken(res, updatedUser._id)
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
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
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.role === "admin") {
      res.status(400)
      throw new Error("You can't delete admin user")
    }
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export const forgotePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    res.status(404)
    throw new Error("user not found by this email")
  }
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/reset/${resetToken}`
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
  generateToken(res, user._id)
  res.status(200).json({ message: "password reset successfully" })
})
