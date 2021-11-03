import express from 'express'
const router = express.Router()

import { addMemoryVerse } from '../controllers/UserMemoryVersesController.js'

import { auth } from '../middleware/authMiddleware.js'

router.post('/addMemoryVerse', auth, addMemoryVerse)

export default router
