import mongoose from "mongoose"

const pendingOrderSchema = mongoose.Schema(
  {
    tendetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    bidPrice: {
      type: number,
      required: true,
    },
    houseEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: House,
      required: true,
    },

    status: {
      type: string,
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
