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

  //check if renter has  pendingorder for this house

  const pendingOrder = await PendingOrder.find({
    houseEntityId,
    tenetId: req.user._id,
  })
  if (pendingOrder.length > 0) {
    res.status(403)
    throw new Error("You already have pending order for this house")
  }

  const pending = await PendingOrder.create({
    tenetId: req.user._id,
    bidPrice,
    houseEntityId,
    startDate,
    endDate,
  })
  res.status(201).json(pending)
})

const getMyPending = asyncHandler(async (req, res) => {
  const pending = await PendingOrder.find({ tenetId: req.user._id }).populate(
    "houseEntityId"
  )
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const getAllPending = asyncHandler(async (req, res) => {
  // get all pending for landlord for his houses if house has broker
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
  const houses = await House.find(queryObj)

  const pending = await PendingOrder.find({
    houseEntityId: { $in: houses.map((house) => house._id) },
  }).populate("tenetId")
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const getPendingOrdersForHouse = asyncHandler(async (req, res) => {
  const { id: houseId } = req.params
  const pending = await PendingOrder.find({ houseEntityId: houseId }).populate(
    "tenetId"
  )
  if (!pending) {
    res.status(404)
    throw new Error("Pending not found")
  }
  res.status(200).json(pending)
})

const getSinglePending = asyncHandler(async (req, res) => {
  const { id } = req.params
  const pending = await PendingOrder.findById(id)
    .populate("houseEntityId")
    .populate("tenetId")
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

  let broker
  if (house.hasBroker) {
    broker = house.brokers.find((broker) => broker.status === "accepted")
  }
  if (broker && req.user._id.toString() !== broker._id.toString()) {
    res.status(403)
    throw new Error("House has broker")
  }
  house.houseStatus = "rented"
  house.rentershistory.push(pending.tenetId)
  house.numberRente = house.numberRente + 1
  await house.save()
  pending.status = "accepted"
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
  house.rentershistory.push(pending.tenetId)
  house.numberRente = house.numberRente + 1
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

export {
  createPending,
  getMyPending,
  getAllPending,
  getSinglePending,
  acceptPending,
  rejectPending,
  proposeCounterOffer,
  acceptCounterOffer,
  rejectCounterOffer,
  getPendingOrdersForHouse,
}
