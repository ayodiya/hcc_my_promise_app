import MyPromises from '../models/MyPromise.js'

async function getMyPromise (req, res) {
  const myPromiseCount = await MyPromises.count()

  try {
    const random = Math.floor(Math.random() * myPromiseCount)
    const myPromises = await MyPromises.findOne().skip(random)

    res.status(200).json({ myPromises })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { getMyPromise }
