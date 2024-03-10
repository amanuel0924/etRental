import asyncHandler from "express-async-handler"
import House from "./../model/houseModel.js"

const getAllHouse = asyncHandler(async (req, res) => {
  console.log(req.query)
  const houses = await House.find(req.query)
  if (!houses) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(houses)
})

const createHouse = asyncHandler(async (req, res) => {
  const {
    siteLocation,
    category,
    type,
    price,
    description,
    photoList,
    status,
    numberRente,
  } = req.body

  const house = await House.create({
    user: req.user._id,
    siteLocation,
    category,
    type,
    price,
    description,
    photoList,
    status,
    numberRente,
  })
  if (house) {
    res.status(201).json(house)
  } else {
    res.status(400)
    throw new Error("Invalid house data")
  }
})

const getSingleHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(house)
})

const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(house)
})

const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findByIdAndDelete(id)
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(house)
})

const requestToRent = asyncHandler(async (req, res) => {
  const { id } = req.params
  res.send("request")
})

export {
  getAllHouse,
  createHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  requestToRent,
}
