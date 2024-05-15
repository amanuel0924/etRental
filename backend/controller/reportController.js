import Report from "../model/ReportModel.js"
import House from "../model/houseModel.js"
import asyncHandler from "express-async-handler"

const createReport = asyncHandler(async (req, res) => {
  const { type, description, house } = req.body
  const sender = req.user._id
  const report = new Report({
    type,
    description,
    house,
    sender,
  })
  const createdReport = await report.save()
  res.status(201).json(createdReport)
})

const getallReports = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const count = await Report.countDocuments({})
  const reports = await Report.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!reports) {
    res.status(404)
    throw new Error("Reports not found")
  }
  res.status(200).json({
    reports,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

const getReportsForhouse = asyncHandler(async (req, res) => {
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
  const houses = await House.find(queryObj)
  const count = await Report.countDocuments({ house: { $in: houses } })
  const reports = await Report.find({ house: { $in: houses } })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!reports) {
    res.status(404)
    throw new Error("Reports not found")
  }
  res.status(200).json({
    reports,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ sender: req.user._id })
  if (!reports) {
    res.status(404)
    throw new Error("Reports not found")
  }
  res.status(200).json(reports)
})

const resolveReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
  if (!report) {
    res.status(404)
    throw new Error("Report not found")
  }

  if (report.status === "resolved") {
    res.status(400)
    throw new Error("Report already resolved")
  }

  report.status = "resolved"
  const updatedReport = await report.save()
  res.status(200).json(updatedReport)
})

export {
  createReport,
  getReportsForhouse,
  getMyReports,
  getallReports,
  resolveReport,
}
