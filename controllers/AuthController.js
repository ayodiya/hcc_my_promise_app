import User from '../models/User.js'

async function registerUser (req, res) {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    const newUser = await User.create({
      name,
      email,
      password
    })
    res.json(newUser)
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

async function loginUser (req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    console.log('this is user', user)

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    } else {
      return res.status(401).json({ msg: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { registerUser, loginUser }
