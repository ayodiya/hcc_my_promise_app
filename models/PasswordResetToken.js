import mongoose from 'mongoose'

const passwordResetTokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 86400
  }
})

const PasswordResetToken = mongoose.model('Token', passwordResetTokenSchema)

export default PasswordResetToken
