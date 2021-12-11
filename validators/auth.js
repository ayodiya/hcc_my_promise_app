import { check } from 'express-validator'

const registerValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

const loginValidator = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

const forgotValidator = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address')

]

const resetValidator = [
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')

]

export { registerValidator, loginValidator, forgotValidator, resetValidator }
