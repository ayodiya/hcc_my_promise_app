import express from 'express'

import { registerUser, loginUser, forgotPassword } from '../controllers/AuthController.js'

import { auth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgotPassword', auth, forgotPassword)

export default router
