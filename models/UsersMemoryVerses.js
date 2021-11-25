import mongoose from 'mongoose'

const usersMemoryVersesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  memoryVerses: [
    {
      memoryVerse: { type: String, required: true },
      memoryVerseText: { type: String, required: true },
      createdAt: { type: Date, required: true }
    }
  ],
  memoryVersesIndex: {
    type: Array

  }
})

const UsersMemoryVerses = mongoose.model(
  'UsersMemoryVerses',
  usersMemoryVersesSchema
)

export default UsersMemoryVerses
