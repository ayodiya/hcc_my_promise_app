import express from 'express'
const router = express.Router()

import { registerUser, loginUser } from '../controllers/AuthController.js'

router.post('/register', registerUser).post(registerUser)
router.post('/login', loginUser)

export default router
