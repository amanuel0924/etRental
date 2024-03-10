import jwt from "jsonwebtoken"

const generateToken = (res, id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2m",
  })
  const refreshToken = jwt.sign({ id }, process.env.REF_TOKEN_SECRET, {
    expiresIn: "1d",
  })
  res.cookie("accessToken", accessToken, {
    maxAge: 60000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  })
  res.cookie("refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  })
}
export const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken
  let exist = false
  let id
  if (!refreshToken) {
    res.status(401)
    throw new Error("you haven't  login or don't have refresh token")
  } else {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REF_TOKEN_SECRET)
      id = decoded.id
      const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "2m",
      })

      res.cookie("accessToken", accessToken, {
        maxAge: 60000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      console.log("refresh token success")
      exist = true
    } catch (error) {
      res.status(401)
      throw new Error("refresh token failed")
    }
  }
  return { exist, id }
}

export default generateToken
