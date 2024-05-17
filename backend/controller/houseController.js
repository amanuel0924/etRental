import fs from "fs"
import path from "path"
import asyncHandler from "express-async-handler"
import House from "./../model/houseModel.js"
import PendingOrder from "../model/pendingOrderModel.js"
import { uploadHousePhoto, resize } from "./uploadController.js"

const getAllHouse = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const queryObj = { active: true }
  console.log(req.query)
  if (req.query.keyword) {
    queryObj.name = {
      $regex: req.query.keyword,
      $options: "i",
    }
  }
  if (req.query.category) {
    queryObj.category = req.query.category
  }

  if (req.query.type) {
    queryObj.type = req.query.type
  }

  if (req.query.sitelocation) {
    queryObj.sitelocation = req.query.sitelocation
  }

  const count = await House.countDocuments(queryObj)
  const houses = await House.find(queryObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!houses) {
    res.status(404)
    throw new Error("House not found")
  }
  res.status(200).json({
    result: houses.length,
    page,
    pages: Math.ceil(count / pageSize),
    houses,
  })
})
const getAllHouseforAdmin = asyncHandler(async (req, res) => {
  const pageSize = 7
  const page = Number(req.query.pageNumber) || 1
  const queryObj = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}
  const count = await House.countDocuments(queryObj)
  const houses = await House.find(queryObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!houses) {
    res.status(404)
    throw new Error("House not found")
  }
  res.status(200).json({
    result: houses.length,
    page,
    pages: Math.ceil(count / pageSize),
    houses,
  })
})

const getMyHouse = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const queryObj =
    req.user.role === "landlord"
      ? {
          hasBroker: false,
          user: req.user._id,
          active: true,
        }
      : {
          active: true,
          $or: [
            { user: req.user._id },
            {
              brokers: {
                $elemMatch: {
                  broker: req.user._id,
                  status: "accepted",
                },
              },
            },
          ],
        }

  const count = await House.countDocuments(queryObj)

  const houses = await House.find(queryObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!houses) {
    res.status(404)
    throw new Error("House not found")
  }
  res.status(200).json({
    page,
    pages: Math.ceil(count / pageSize),
    result: houses.length,
    houses,
  })
})

const createHouse = asyncHandler(async (req, res) => {
  const {
    siteLocation,
    category,
    type,
    price,
    image,
    description,
    status,
    numberRente,
    name,
  } = req.body

  const house = await House.create({
    user: req.user._id,
    siteLocation,
    category,
    type,
    price,
    image,
    description,
    status,
    numberRente,
    name,
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
  const house = await House.findById(id).populate("feedbacks.renter")
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (req.user.role === "renter") {
    house.viewCount = house.viewCount + 1
    await house.save()
  }
  res.status(200).json(house)
})

const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findById(id)

  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }

  if (req.user._id.toString() !== house.user.toString()) {
    res.status(403)
    throw new Error("you can't edit other's house")
  }

  const allowedUpdates = [
    "name",
    "description",
    "price",
    "image",
    "type",
    "category",
    "siteLocation",
  ]

  const updates = Object.keys(req.body).reduce((acc, key) => {
    if (allowedUpdates.includes(key)) {
      acc[key] = req.body[key]
    }
    return acc
  }, {})
  if (req.files) {
    await Promise.all(
      house.image.map(async (file) => {
        const imagePath = path.join("..", "backend", "uploads", "house", file)
        await fs.promises.unlink(imagePath)
      })
    )
  }
  const updatedhouse = await House.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
  if (!updatedhouse) {
    res.status(404)
    throw new Error("House not found")
  }
  res.status(200).json(updatedhouse)
})

const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params

  let house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (house.image) {
    await Promise.all(
      house.image.map(async (file) => {
        const imagePath = path.join("..", "backend", "uploads", "house", file)
        await fs.promises.unlink(imagePath)
      })
    )
  }
  house = await House.findByIdAndDelete(id)

  res.status(200).json({ message: "House deleted successfully" })
})

const deleteMyHouse = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (req.user._id.toString() !== house.user.toString()) {
    res.status(403)
    throw new Error("you can't delete other's house")
  }

  await House.findByIdAndUpdate(req.params.id, { active: false })

  res.status(200).json({
    message: "house deleted successuly",
  })
})

const lockAndUnlockHouse = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }

  if (req.user._id.toString() !== house.user.toString()) {
    res.status(403)
    throw new Error("you can't edit other's house")
  }
  if (house.houseStatus === "rented") {
    res.status(403)
    throw new Error("You can't freeze a rented house")
  }

  await House.findByIdAndUpdate(id, {
    houseStatus:
      house.houseStatus === "available" ? "unavailable" : "available",
  })

  res.status(200).json({ message: "House status updated successfully" })
})
const createFeedback = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body

  const house = await House.findById(req.params.id)

  if (house) {
    //check if renter is renter of this house in rentehistory array
    const renterIsExist = house.rentershistory.find(
      (renter) => renter.toString() === req.user._id.toString()
    )
    if (!renterIsExist) {
      res.status(400)
      throw new Error(
        "Only renters who have history can give feedback in this house"
      )
    }

    const feedbackIsExist = house.feedbacks.find(
      (feedback) => feedback.renter.toString() === req.user._id.toString()
    )
    if (feedbackIsExist) {
      res.status(400)
      throw new Error("house already reviewd")
    }
    console.log(req.user)
    if (req.user.role !== "renter") {
      res.status(400)
      throw new Error(" only renter can give feedback for house")
    }
    const feedback = {
      renter: req.user._id,
      rating,
      comment,
    }

    house.feedbacks.push(feedback)

    house.numFeedbacks = house.feedbacks.length
    house.generalRating =
      house.feedbacks.reduce((acc, item) => item.rating + acc, 0) /
      house.feedbacks.length
    await house.save()
    res.status(201).json({
      status: "success",
      message: "feedback added",
    })
  } else {
    res.status(404)
    throw new Error("resource not found")
  }
})

const createBrokersRequest = asyncHandler(async (req, res) => {
  const { id: houseId } = req.params
  const house = await House.findById(houseId)
  if (!house) {
    res.status(404)
    throw new Error("house not found")
  }

  if (house.user.toString() === req.user._id.toString()) {
    res.status(400)
    throw new Error("you can't request your own house")
  }
  const isExist = house.brokers.find(
    (broker) => broker.broker.toString() === req.user._id.toString()
  )
  if (isExist) {
    res.status(400)
    throw new Error("you already requested this house")
  }
  const brokerRequest = {
    broker: req.user._id,
    house: houseId,
    status: "pending",
    commition: req.body.commition,
  }
  house.brokers.push(brokerRequest)
  await house.save()
  res.status(201).json({
    status: "success",
    message: "request sent",
  })
})
const acceptBrokerRequest = asyncHandler(async (req, res) => {
  const { houseId, brokerId } = req.body
  const house = await House.findById(houseId)
  if (!house) {
    res.status(404)
    throw new Error("house not found")
  }
  const brokerRequest = house.brokers.find(
    (broker) => broker.broker.toString() === brokerId
  )
  if (!brokerRequest) {
    res.status(404)
    throw new Error("request not found")
  }
  if (brokerRequest.status !== "pending") {
    res.status(400)
    throw new Error("request already accepted or rejected")
  }
  brokerRequest.status = "accepted"
  house.hasBroker = true
  //reject other brokers
  house.brokers.forEach((broker) => {
    if (broker.broker.toString() !== brokerId) {
      broker.status = "rejected"
    }
  })
  await house.save()
  res.status(200).json({
    status: "success",
    message: "request accepted",
  })
})
const rejectBrokerRequest = asyncHandler(async (req, res) => {
  const { houseId, brokerId } = req.body
  const house = await House.findById(houseId)
  if (!house) {
    res.status(404)
    throw new Error("house not found")
  }
  const brokerRequest = house.brokers.find(
    (broker) => broker.broker.toString() === brokerId
  )
  if (!brokerRequest) {
    res.status(404)
    throw new Error("request not found")
  }
  if (brokerRequest.status !== "pending") {
    res.status(400)
    throw new Error("request already accepted or rejected")
  }
  brokerRequest.status = "rejected"
  await house.save()
  res.status(200).json({
    status: "success",
    message: "request rejected",
  })
})

//make available house for rent
const makeHouseAvailable = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }

  if (!house.rentershistory.includes(req.user._id.toString())) {
    res.status(403)
    throw new Error("you can't edit other's house")
  }

  house.houseStatus = "available"
  house.hasBroker = false
  house.brokers = []
  //remove all pending orders for this house
  await PendingOrder.deleteMany({ houseEntityId: id })

  await house.save()

  res.status(200).json({ message: "House status updated successfully" })
})

// get all house and count by status

const getHouseCountByStatus = asyncHandler(async (req, res) => {
  const houseCount = await House.aggregate([
    {
      $group: {
        _id: "$houseStatus",
        count: { $sum: 1 },
      },
    },
  ])
  res.status(200).json(houseCount)
})

export {
  getAllHouse,
  createHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  deleteMyHouse,
  getMyHouse,
  lockAndUnlockHouse,
  uploadHousePhoto,
  resize,
  createFeedback,
  createBrokersRequest,
  acceptBrokerRequest,
  rejectBrokerRequest,
  makeHouseAvailable,
  getAllHouseforAdmin,
  getHouseCountByStatus,
}
