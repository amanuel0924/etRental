import mongoose from "mongoose"

const reportSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "Maintenance Issue",
        "Noise Complaint",
        "Threats or violence",
        "Failing to make necessary repairs",
        "Illegal activity",
        "Property damage",
        "landlord/broker ",
        "Other",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "House",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

const Report = mongoose.model("Report", reportSchema)
export default Report
