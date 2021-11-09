import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

async function registerUser (req, res) {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ msg: 'User with the email already exists' })
    }
    const user = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

async function loginUser (req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      return res.status(401).json({ msg: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { registerUser, loginUser }
