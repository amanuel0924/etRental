import { number, string } from "joi"
import mongoose from "mongoose"

const pendingOrderSchema = mongoose.Schema({
  tendetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  Date: {
    type: Date,
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
  statuse: {
    type: string,
    required: true,
    enum: ["accepted", "rejected"],
  },
})
const PendingOrder = mongoose.model("PendingOrder", pendingOrderSchema)
export default PendingOrder
