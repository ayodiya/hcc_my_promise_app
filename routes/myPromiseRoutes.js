import express from 'express'

import { getMyPromise } from '../controllers/MyPromiseController.js'
import { auth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', auth, getMyPromise)

export default router
