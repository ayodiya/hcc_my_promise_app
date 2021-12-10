import express from 'express'

import {

  getMemoryVerses
} from '../controllers/UserMemoryVersesController.js'

import { auth } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/getMemoryVerses', auth, getMemoryVerses)

export default router
