import asyncHandler from "express-async-handler"

const getAllHouse = asyncHandler(async (req, res) => {
  // Your logic to get all houses
  res.send("getAllHouse")
})

const createHouse = asyncHandler(async (req, res) => {
  // Your logic to create a house
  res.send("createHouse")
})

const getSingleHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to get a single house by id
  res.send("getSingleHouse")
})

const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to update a house
  res.send("updateHouse")
})

const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to delete a house
  res.send("deleteHouse")
})

const request = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic for the request route
  res.send("request")
})

const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to delete feedback
  res.send("deleteFeedback")
})

const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to update feedback
  res.send("updateFeedback")
})

const getSingleFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Your logic to get a single feedback
  res.send("getSingleFeedback")
})

const getAllfeedback = asyncHandler(async (req, res) => {
  // Your logic to get all feedback
  res.send("getAllfeedback")
})

const createFeedBack = asyncHandler(async (req, res) => {
  // Your logic to create feedback
  res.send("createFeedBack")
})

export {
  getAllHouse,
  createHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  request,
  deleteFeedback,
  updateFeedback,
  getSingleFeedback,
  getAllfeedback,
  createFeedBack,
}
