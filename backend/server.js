import express from "express"
import dotenv from "dotenv"
import DBconnection from "./config/DBconnection.js"

dotenv.config()
DBconnection()

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log("Server started on,", port)
})
