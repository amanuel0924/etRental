import mongoose from "mongoose"
import User from "./userModel.js"

const houseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  siteLocation: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["apartment", "villa", "studio"],
  },
  type: {
    type: String,
    enum: ["single", "double", "three-bed"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoList: {
    type: String,
  },

  status: {
    type: String,
    enum: ["available", "pending", "rented"],
  },
  viewCount: {
    type: Number,
  },
  generalRating: {
    type: Number,
  },

  numberRente: {
    type: Number,
    default: 0,
  },
})

const House = mongoose.model("House", houseSchema)
export default House
