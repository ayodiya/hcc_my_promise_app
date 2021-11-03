import mongoose from 'mongoose'

const myPromiseSchema = mongoose.Schema({
  memoryVerse: { type: String, required: true },
  memoryVerseText: { type: String, required: true }
})

const MyPromises = mongoose.model('MyPromises', myPromiseSchema)

export default MyPromises
