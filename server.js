import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import userMemoryVersesRoutes from './routes/userMemoryVersesRoutes.js'
import myPromiseRoutes from './routes/myPromiseRoutes.js'

dotenv.config()

// Connect Database
connectDB()

// init express app
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Init Middleware
app.use(express.json())
app.use(cors())

// Define Routes
app.use('/api/myPromise', myPromiseRoutes)
app.use('/api/users', authRoutes)
app.use('/api/userMemoryVerses', userMemoryVersesRoutes)

const port = process.env.PORT || 8000

// get  build of react in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  )
}

// listen to  server port
app.listen(port, () => console.log(`Server running on port ${port}`))
