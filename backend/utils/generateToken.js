import jwt from "jsonwebtoken"

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  })
}

export default generateToken
