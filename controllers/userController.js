import User from '../models/User.js'

async function registerUser (req, res) {
  const { Name, Email, Password } = req.body

  console.log(req.body)

  try {
    const user = await User.findOne({ Email })

    if (user) {
      res.status(400)
      throw new Error('User already exists')
    }
    const newUser = await User.create({
      Name,
      Email,
      Password
    })
    res.json(newUser)
  } catch (error) {
    console.log(error)
  }
}

export { registerUser }
