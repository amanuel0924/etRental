export const notFound = (req, res, next) => {
  res.status(404)
  next(new Error(`Can't find ${req.originalUrl} on this server`))
}
export const gobalErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === "CastError") {
    statusCode = 404
    message = "Resource not found"
  }

  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production" ? "something is wrong" : err.stack,
  })
}
