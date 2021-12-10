import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import User from '../models/User.js'
import PasswordResetToken from '../models/PasswordResetToken.js'
import generateToken from '../utils/generateToken.js'
import nodemailerTransporter from '../utils/nodemailerTransporter.js'

const bcryptSalt = process.env.BCRYPT_SALT

// @route   post api/users/register
// @desc    register User
// @access public

async function registerUser (req, res) {
  const { name, email, password } = req.body

  try {
    // find user in database using email
    const userExists = await User.findOne({ email })

    // if user exists return user with email exists
    if (userExists) {
      return res.status(400).json({ msg: 'User with the email already exists' })
    }

    // if user doesn't exist create user
    const user = await User.create({
      name,
      email,
      password
    })

    // respond with newly created user and token
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

// @route   post api/users/login
// @desc    login User
// @access public

async function loginUser (req, res) {
  const { email, password } = req.body

  try {
    // find user in database
    const user = await User.findOne({ email })

    // if user exist and  password match return user information else return error
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

// @route   post api/users/forgotPassword
// @desc    forgot password
// @access public

async function forgotPassword (req, res) {
  const { email } = req.body

  try {
    // find user in database
    const userExists = await User.findOne({ email })

    // user  does not return error msg to user
    if (!userExists) {
      return res.status(400).json({ msg: 'User with the email doesn\'t exists' })
    }

    const { name, _id } = userExists

    // generate token
    const resetToken = uuidv4()

    // encrypt token
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

    // add token details to PasswordResetToken collection
    await PasswordResetToken.create({
      user: _id,
      token: hash
    })

    // create transporter to send email
    const transporter = nodemailerTransporter()

    // send email
    await transporter.sendMail({
      from: 'promiseslip@harvesthousecc.org', // sender address
      to: 'devayodiya@gmail.com', // list of receivers
      subject: 'My Promise  - Forgot Password ', // Subject line
      html: `<h2>Hello ${name}</h2><p>Click the link below to reset your password.</p><p>The link is only valid for 30 minutes</p><p>${process.env.BASE_URL}/reset-password?token=${resetToken}&id=${_id}</p>`

    })

    return res.status(200).json({ msg: 'Please check your email' })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

// @route   post api/users/resetPassword
// @desc    reset password
// @access public

async function resetPassword (req, res) {
  const { resetToken, password, user } = req.body

  try {
    // find user latest token in the database
    const userResetToken = await PasswordResetToken.findOne({ user: user }).sort({ createdAt: -1 })

    // return to user if no token found for the user
    if (!userResetToken) {
      return res.status(410).json({ msg: 'The reset token for the user has expired' })
    }
    // check if user token is the same with the one in database
    const isValid = await bcrypt.compare(resetToken, userResetToken.token)

    // if not valid return to error msg user
    if (!isValid) {
      return res.status(410).json({ msg: 'The reset token for the user has expired' })
    }

    // hash new password
    const hash = await bcrypt.hash(password, Number(bcryptSalt))

    // update user with the new hashed password
    await User.updateOne(
      { _id: user },
      { $set: { password: hash } },
      { new: true }
    )

    // delete all token related to the user
    await PasswordResetToken.deleteMany({ user: user })

    // find the user name to send email
    const { name } = await User.findById({ _id: user })

    // create transporter to send email
    const transporter = nodemailerTransporter()

    // send email
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
