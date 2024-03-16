import mongoose from "mongoose"
import User from "./userModel.js"

const houseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    siteLocation: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["apartment", "villa"],
      default: "apartment",
    },
    type: {
      type: String,
      enum: ["single", "double", "three-bed"],
      default: "single",
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [],

    houseStatus: {
      type: String,
      enum: ["available", "unavailable", "rented"],
      default: "available",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    generalRating: {
      type: Number,
      default: 4,
    },

    numberRente: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

const House = mongoose.model("House", houseSchema)
export default House
