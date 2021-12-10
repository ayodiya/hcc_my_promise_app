import express from 'express'

import {
  addMemoryVerse,
  getMemoryVerses
} from '../controllers/UserMemoryVersesController.js'

import { auth } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/addMemoryVerse', auth, addMemoryVerse)
router.get('/getMemoryVerses', auth, getMemoryVerses)

export default router
