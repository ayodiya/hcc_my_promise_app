import express from 'express'

import { registerUser, loginUser, forgotPassword, resetPassword } from '../controllers/AuthController.js'

// import validators
import { registerValidator, loginValidator, forgotValidator, resetValidator } from '../validators/auth.js'
import { runValidation } from '../validators/index.js'

const router = express.Router()

router.post('/register', registerValidator, runValidation, registerUser)
router.post('/login', loginValidator, runValidation, loginUser)
router.post('/forgotPassword', forgotValidator, runValidation, forgotPassword)
router.post('/resetPassword', resetValidator, runValidation, resetPassword)

export default router
