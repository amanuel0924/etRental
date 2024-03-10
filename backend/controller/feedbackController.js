import Feedback from "../model/feedbackModel"
import asyncHandler from "express-async-handler"

const createFeedback = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const feedback = await Feedback.create({
    rating,
    comment,
    user: req.user._id,
  })
  if (feedback) {
    res.status(201).json(feedback)
  } else {
    res.status(400)
    throw new Error("Invalid feedback data")
  }
})

const getAllFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({}).populate("user", "name")
  if (!feedbacks) {
    res.status(404)
    throw new Error("No feedback found")
  }
  res.status(200).json(feedbacks)
})

const getSingleFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  const feedback = await Feedback.findById(id).populate("user", "name")
  if (!feedback) {
    res.status(404)
    throw new Error("No feedback found")
  }
  res.status(200).json(feedback)
})

const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  const feedback = await Feedback.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!feedback) {
    res.status(404)
    throw new Error("No feedback found")
  }
  res.status(200).json(feedback)
})

const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  const feedback = await Feedback.findByIdAndDelete(id)
  if (!feedback) {
    res.status(404)
    throw new Error("No feedback found")
  }
  res.status(200).json(feedback)
})

export {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
}
