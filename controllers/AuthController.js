import nodemailer from 'nodemailer'

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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    const userExists = await User.findOne({ email })

    if (!userExists) {
      return res.status(400).json({ msg: 'User with the email doesn\'t exists' })
    }

    const { name, _id } = userExists

    const token = generateToken(_id, '2h')

    await transporter.sendMail({
      from: 'promiseslip@harvesthousecc.org', // sender address
      to: 'devayodiya@gmail.com', // list of receivers
      subject: 'My Promise  - Forgot Password ', // Subject line
      html: `<h2>Hello ${name}</h2><p>Click the link below to reset your password.</p><p>The link is only valid for 2hrs</p><p>${process.env.BASE_URL}/reset-password/${token}</p>`

    })

    return res.status(200).json({ msg: 'Please check your email' })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
  // send mail with defined transport object

  // console.log('Message sent: %s', info.messageId)
}

export { registerUser, loginUser, forgotPassword }
