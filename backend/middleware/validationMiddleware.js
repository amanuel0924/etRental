import Joi from "joi"

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Name is required and cannot be empty." }
      }),
    email: Joi.string()
      .trim()
      .email()
      .required()
      .error(() => {
        return { message: "Enter a valid email address." }
      }),
    phoneNumber: Joi.string().trim().required(),
    password: Joi.string()
      .trim()
      .min(8)
      .max(30)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^s]{8,}$"))
      .required()
      .error(() => {
        return {
          message:
            "Password must be at least 8 characters & contain a num,lowercase,uppercase letter.",
        }
      }),
    role: Joi.string().valid("renter", "landlord", "admin", "super", "broker"),
  }).options({ stripUnknown: true })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

const houseValidation = (req, res, next) => {
  const schema = Joi.object({
    siteLocation: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Site location is required and cannot be empty." }
      }),
    category: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Category is required and cannot be empty." }
      }),
    type: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Type is required and cannot be empty." }
      }),
    price: Joi.number()
      .required()
      .error(() => {
        return { message: "Price is required and cannot be empty." }
      }),

    description: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Description is required and cannot be empty." }
      }),
    name: Joi.string()
      .trim()
      .required()
      .error(() => {
        return { message: "Name is required and cannot be empty." }
      }),
  }).options({ stripUnknown: true })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

export { userValidation, houseValidation }
