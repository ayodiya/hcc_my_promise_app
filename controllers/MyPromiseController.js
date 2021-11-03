import MyPromises from '../models/MyPromise.js'

async function getMyPromise (req, res) {
  const myPromiseCount = await MyPromises.count()

  const random = Math.floor(Math.random() * myPromiseCount)
  const myPromises = await MyPromises.findOne().skip(random)

  res.status(201).json({ myPromises })
}

export { getMyPromise }
