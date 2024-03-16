import asyncHandler from "express-async-handler"
import House from "./../model/houseModel.js"
import multer from "multer"
import path from "path"
import sharp from "sharp"

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/")
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })
const storage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new Error("Please upload only images."), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
})

const resize = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next()
  }
  req.body.image = []
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `image-${Date.now()}-${i + 1}.jpeg`
      // req.file.path = `uploads/${req.file.filename}`
      await sharp(file.buffer)
        .resize({
          width: 500,
          height: 500,
          fit: "cover",
        })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.resolve("uploads/", filename))
      req.body.image.push(filename)
    })
  )
  console.log(req.files)
  next()
})

const uploadHousePhoto = upload.array("image", 3)

const getAllHouse = asyncHandler(async (req, res) => {
  console.log(req.query)
  const houses = await House.find(req.query)
  if (!houses) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(houses)
})

const getMyHouse = asyncHandler(async (req, res) => {
  const houses = await House.find({ user: req.user._id })
  if (!houses) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(houses)
})

const createHouse = asyncHandler(async (req, res) => {
  console.log(req.body)
  if (req.file) {
    const image = req.file.filename
    req.body.image = image
  }
  const {
    siteLocation,
    category,
    type,
    price,
    image,
    description,
    status,
    numberRente,
    name,
  } = req.body

  const house = await House.create({
    user: req.user._id,
    siteLocation,
    category,
    type,
    price,
    image,
    description,
    status,
    numberRente,
    name,
  })
  if (house) {
    res.status(201).json(house)
  } else {
    res.status(400)
    throw new Error("Invalid house data")
  }
})

const getSingleHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(house)
})

const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findById(id)

  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }

  if (req.user._id !== house.user) {
    res.status(403)
    throw new Error("you can't edit other's house")
  }

  const allowedUpdates = ["name", "description", "price", "photoList"]
  const updates = Object.keys(req.body).reduce((acc, key) => {
    if (allowedUpdates.includes(key)) {
      acc[key] = req.body[key]
    }
    return acc
  }, {})

  const updatedhouse = await House.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
  if (!updatedhouse) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(updatedhouse)
})

const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const house = await House.findByIdAndDelete(id)
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }
  res.status(200).json(house)
})
const deleteMyHouse = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "landlord" || req.user.role !== "broker") {
    res.status(404)
    throw new Error("you don't have permition to do perform this action")
  }

  await House.findByIdAndUpdate(req.params._id, { active: false })

  res.status(200).json({
    message: "house deleted successuly",
  })
})

const freezAndUnfreezHouse = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const house = await House.findById(id)
  if (!house) {
    res.status(404)
    throw new Error("No house found")
  }

  if (req.user._id !== house.user) {
    res.status(403)
    throw new Error("you can't edit other's house")
  }
  if (house.houseStatus === "rented") {
    res.status(403)
    throw new Error("you can't freez this house RENTED")
  }

  await House.findByIdAndUpdate(req.params._id, {
    houseStatus: `${
      house.houseStatus === "available" ? "unavailable" : "available"
    }`,
  })

  res.status(200).json({
    message: "house deleted successuly",
  })
})

export {
  getAllHouse,
  createHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  deleteMyHouse,
  getMyHouse,
  freezAndUnfreezHouse,
  uploadHousePhoto,
  resize,
}
