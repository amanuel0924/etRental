import mongoose from "mongoose"

const feedbackSchema = mongoose.Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "House",
    },
  },
  {
    timestamps: true,
  }
)

// feedbackSchema.pre("save", async function (next) {
//   const house = await House.findById(this.house)
//   if (house) {
//     house.generalRating =
//       (house.generalRating * house.numberRente + this.rating) /
//       (house.numberRente + 1)
//     house.numberRente = house.numberRente + 1
//     await house.save()
//   }
//   next()
// })

feedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: "renter",
    select: "name",
  })

  next()
})

const Feedback = mongoose.model("Feedback", feedbackSchema)
export default Feedback
