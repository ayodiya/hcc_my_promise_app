import nodemailer from 'nodemailer'
import CryptoJS from 'crypto-js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import User from '../models/User.js'
import PasswordResetToken from '../models/PasswordResetToken.js'
import generateToken from '../utils/generateToken.js'

const bcryptSalt = process.env.BCRYPT_SALT

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

  try {
    const userExists = await User.findOne({ email })
    const { name, _id } = userExists

    // generate token
    const resetToken = uuidv4()

    // encrypt token
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

    if (!userExists) {
      return res.status(400).json({ msg: 'User with the email doesn\'t exists' })
    }

    await PasswordResetToken.create({
      user: _id,
      token: hash
    })

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: 'promiseslip@harvesthousecc.org', // sender address
      to: 'devayodiya@gmail.com', // list of receivers
      subject: 'My Promise  - Forgot Password ', // Subject line
      html: `<h2>Hello ${name}</h2><p>Click the link below to reset your password.</p><p>The link is only valid for 30 minutes</p><p>${process.env.BASE_URL}/reset-password?token=${resetToken}&id=${_id}</p>`

    })

    return res.status(200).json({ msg: 'Please check your email' })
  } catch (error) {
    console.error(error)
    res.status(502).json({ msg: 'Server Error' })
  }
}

async function resetPassword (req, res) {
  const { resetToken, password, user } = req.body

  try {
    const userResetToken = await PasswordResetToken.findOne({ user: user }).sort({ createdAt: -1 })

    if (!userResetToken) {
      return res.status(410).json({ msg: 'The reset token for the user has expired' })
    }
    const isValid = await bcrypt.compare(resetToken, userResetToken.token)

    if (!isValid) {
      return res.status(410).json({ msg: 'The reset token for the user has expired' })
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt))

    await User.updateOne(
      { _id: user },
      { $set: { password: hash } },
      { new: true }
    )

    await PasswordResetToken.deleteMany({ user: user })

    const { name } = await User.findById({ _id: user })

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: 'promiseslip@harvesthousecc.org', // sender address
      to: 'devayodiya@gmail.com', // list of receivers
      subject: 'My Promise  - Reset Password ', // Subject line
      html: `<h2>Hello ${name}</h2><p>Your password was reset was successfully</p>`

    })

    return res.status(200).json({ msg: 'Password changed successfully' })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { registerUser, loginUser, forgotPassword, resetPassword }
