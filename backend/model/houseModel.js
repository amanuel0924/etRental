import mongoose from "mongoose"
import User from "./userModel.js"

const feedbackSchema = mongoose.Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

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
      enum: ["apartment", "villa", "condominium", "service"],
      default: "service",
    },
    type: {
      type: String,
      enum: [
        "one-bedroom",
        "two-bedroom",
        "three-bedroom",
        "studio",
        "single",
        "G+1",
        "G+2",
      ],
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
      default: 0,
    },
    feedbacks: [feedbackSchema],
    numberRente: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const House = mongoose.model("House", houseSchema)
export default House
