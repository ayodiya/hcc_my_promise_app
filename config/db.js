import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    })

    console.log('MongoDB is Connected...')
  } catch (err) {
    process.exit(1)
  }
}

export default connectDB
