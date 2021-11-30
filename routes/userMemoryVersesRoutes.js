import express from 'express'

import {
  addMemoryVerse,
  getMemoryVerses
} from '../controllers/UserMemoryVersesController.js'

import { auth } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/addmemoryverse', auth, addMemoryVerse)
router.get('/getmemoryverses', auth, getMemoryVerses)

export default router
