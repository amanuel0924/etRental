import Report from "../model/ReportModel.js"
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

const getReportsForhouse = asyncHandler(async (req, res) => {
  const reports = await Report.find({ house: req.params.id })
  if (!reports) {
    res.status(404)
    throw new Error("Reports not found")
  }
  res.status(200).json(reports)
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

  report.status = "resolved"
  const updatedReport = await report.save()
  res.status(200).json(updatedReport)
})

export { createReport, getReportsForhouse, getMyReports, resolveReport }