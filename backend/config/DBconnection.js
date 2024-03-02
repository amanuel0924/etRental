import mongoose from "mongoose"

const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connected succesfully")
  } catch (error) {
    console.log(`error: ${error}`)
    process.exit(1)
  }
}

export default DBconnection
