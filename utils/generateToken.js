import jwt from 'jsonwebtoken'

const generateToken = (id, expiresIn = '365d') => {
  return jwt.sign({ data: id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: expiresIn
  })
}

export default generateToken
