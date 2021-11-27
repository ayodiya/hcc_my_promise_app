import ses from 'node-ses'

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

async function forgotPassword (req, res) {
  const { email } = req.body

  const client = ses.createClient({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    amazon: process.env.AWS_SERVER
  })

  const userExists = await User.findOne({ email })

  if (!userExists) {
    return res.status(400).json({ msg: 'User with the email doesn\'t exists' })
  }

  const { name, _id } = userExists

  const token = generateToken(_id, '2h')

  client.sendEmail({
    to: 'devayodiya@gmail.com',
    from: 'hccmypromiseapp@gmail.com',
    subject: 'HCC - My Promise App  Password Reset',
    message: `<h5>Hello ${name}<p>Click on the link below to reset you password. Link is valid for 2 hours.</p><p>http://localhost:3000/forgot-password/${token}</p>`

  }, function (err, data) {
    if (data) {
      return res.status(200).json({ msg: 'A message has been sent to your email' })
    } if (err) {
      res.status(502).json({ msg: 'Server Error' })
    }
  })
}

export { registerUser, loginUser, forgotPassword }
