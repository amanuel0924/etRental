import multer from "multer"
import sharp from "sharp"
import path from "path"
import asyncHandler from "express-async-handler"

const storage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  console.log(file)
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
          fit: "fill",
        })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.resolve("uploads/house/", filename))
      req.body.image.push(filename)
    })
  )

  next()
})

const resizeUser = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next()
  }
  const filename = `image-${Date.now()}.jpeg`
  await sharp(req.file.buffer)
    .resize({
      width: 450,
      height: 450,
      fit: "fill",
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.resolve("uploads/user", filename))
  req.body.image = filename
  next()
})

const uploadHousePhoto = upload.array("image", 3)
const uploadUserPhoto = upload.single("image")

export { uploadUserPhoto, resizeUser, uploadHousePhoto, resize }
