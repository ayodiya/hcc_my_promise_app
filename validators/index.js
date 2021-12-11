import { validationResult } from 'express-validator'

const runValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg
    })
  }
  next()
}

export { runValidation }
