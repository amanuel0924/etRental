import mongoose from "mongoose"
import User from "./userModel.js"
import House from "./houseModel.js"

const pendingOrderSchema = mongoose.Schema(
  {
    tenetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    bidPrice: {
      type: Number,
      required: true,
    },
    houseEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: House,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected", "couterOffer"],
      default: "pending",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    hasCouterOffer: {
      type: Boolean,
      default: false,
    },
    couterOfferPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)
const PendingOrder = mongoose.model("PendingOrder", pendingOrderSchema)
export default PendingOrder
