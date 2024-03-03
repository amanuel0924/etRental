import express from "express"
import dotenv from "dotenv"
import DBconnection from "./config/DBconnection.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import { notFound, gobalErrorHandler } from "./middleware/errorMiddleware.js"
import userRouter from "./routes/userRoute.js"
import houseRouter from "./routes/houseRoute.js"

dotenv.config()
DBconnection()

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/users", userRouter)
app.use("/api/house", houseRouter)

app.all("*", notFound)
app.use(gobalErrorHandler)

app.listen(port, () => {
  console.log("Server started on,", port)
})
