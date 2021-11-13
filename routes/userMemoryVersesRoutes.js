import express from 'express'
const router = express.Router()

import {
  addMemoryVerse,
  getMemoryVerses
} from '../controllers/UserMemoryVersesController.js'

import { auth } from '../middleware/authMiddleware.js'

router.post('/addmemoryverse', auth, addMemoryVerse)
router.get('/getmemoryverses', auth, getMemoryVerses)

export default router
