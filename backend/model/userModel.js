import mongoose from "mongoose"
import crypto from "crypto"
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["renter", "landlord", "admin", "super", "broker"],
      default: "renter",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    block: {
      type: Boolean,
      default: false,
      select: false,
    },
    blocker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },

    passwordResetToken: String,
    passwordResetExpiers: String,
  },
  {
    timestamps: true,
  }
)
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
  this.passwordResetExpiers = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model("User", userSchema)
export default User
