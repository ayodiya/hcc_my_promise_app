import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },

  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  MemoryVerses: {
    type: Array
  }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.Password = await bcrypt.hash(this.Password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
