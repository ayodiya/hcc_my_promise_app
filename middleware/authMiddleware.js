import jwt from 'jsonwebtoken'

function auth (req, res, next) {
  const token = req.header('Bearer')

  if (!token) return res.status(401).send('Access denied. No token Provided')

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('Invalid token')
  }
}

export { auth }
