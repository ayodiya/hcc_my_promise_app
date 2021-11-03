import express from 'express'
const router = express.Router()

import { getMyPromise } from '../controllers/MyPromiseController.js'

import { auth } from '../middleware/authMiddleware.js'

router.get('/', auth, getMyPromise)

export default router
