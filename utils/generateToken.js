import jwt from 'jsonwebtoken'

const generateToken = (id, expiresIn = '365d') => {
  return jwt.sign({ id }, process.env.APP_SECRET, {
    algorithm: 'HS256',
    expiresIn: expiresIn
  })
}

export default generateToken
