import PendingOrder from "../model/pendingOrderModel.js"
import House from "../model/houseModel.js"
import asyncHandler from "express-async-handler"

const createPending = asyncHandler(async (req, res, next) => {
  const { bidPrice, houseEntityId, startDate, endDate } = req.body
  const house = await House.findById(req.body.houseEntityId)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (house.houseStatus !== "available") {
    res.status(403)
    throw new Error("House is not available")
  }

  const pending = await PendingOrder.create({
    tendetId: req.user._id,
    bidPrice,
    houseEntityId,
    startDate,
    endDate,
  })
  res.status(201).json(pending)
})

const getMyPending = asyncHandler(async (req, res) => {
  const pending = await PendingOrder.find({ tendetId: req.user._id }).populate(
    "houseEntityId"
  )
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const getAllPending = asyncHandler(async (req, res) => {
  const pending = await PendingOrder.find({}).populate("houseEntityId")
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})
const getPendingOrdersForHouse = asyncHandler(async (req, res) => {
  const { id: houseId } = req.params
  const pending = await PendingOrder.find({ houseEntityId: houseId }).populate(
    "tendetId"
  )
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const getSinglePending = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id).populate("houseEntityId")
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const acceptPending = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id)
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  const house = await House.findById(pending.houseEntityId)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (house.houseStatus !== "available") {
    res.status(403)
    throw new Error("House is not available")
  }
  house.houseStatus = "rented"
  await house.save()
  pending.status = "accepted"
  await pending.save()

  //reject all  pendings
  const pendings = await PendingOrder.find({ houseEntityId: house._id })
  pendings.forEach(async (pending) => {
    if (pending._id != id) {
      pending.status = "rejected"
      await pending.save()
    }
  })

  res.status(200).json(pending)
})

const rejectPending = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id)
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  pending.status = "rejected"
  await pending.save()
  res.status(200).json(pending)
})
const proposeCounterOffer = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { counterOfferPrice } = req.body
  const pending = await PendingOrder.findById(id)
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  pending.hasCouterOffer = true
  pending.couterOfferPrice = counterOfferPrice
  pending.status = "couterOffer"
  await pending.save()
  res.status(200).json(pending)
})
const acceptCounterOffer = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id)
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  const house = await House.findById(pending.houseEntityId)
  if (!house) {
    res.status(404)
    throw new Error("House not found")
  }
  if (house.houseStatus !== "available") {
    res.status(403)
    throw new Error("House is not available")
  }
  house.houseStatus = "rented"
  await house.save()
  pending.status = "accepted"
  pending.hasCouterOffer = false
  pending.bidPrice = pending.couterOfferPrice
  pending.couterOfferPrice = undefined
  await pending.save()

  const pendings = await PendingOrder.find({ houseEntityId: house._id })
  pendings.forEach(async (pending) => {
    if (pending._id != id) {
      pending.status = "rejected"
      await pending.save()
    }
  })
  res.status(200).json(pending)
})
const rejectCounterOffer = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id)
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  pending.status = "rejected"
  pending.hasCouterOffer = false
  pending.couterOfferPrice = undefined
  await pending.save()
  res.status(200).json(pending)
})
