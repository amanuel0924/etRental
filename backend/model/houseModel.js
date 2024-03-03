import mongoose from "mongoose"

const feedbackSchema = mongoose.Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const houseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  site_location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["appatment", "villa", "studio"],
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
  photo_list: {
    type: String,
  },
  status: {
    type: String,
    enum: ["available", "pending", "rented"],
  },
  view_count: {
    type: Number,
  },
  general_rating: {
    type: Number,
  },
  feedback: [feedbackSchema],
  number_rente: {
    type: Number,
    required: true,
  },
})

const House = mongoose.model("House", houseSchema)
export default House
