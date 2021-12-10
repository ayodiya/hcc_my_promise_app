import express from 'express'

import { registerUser, loginUser, forgotPassword, resetPassword } from '../controllers/AuthController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

export default router
