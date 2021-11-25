import MyPromises from '../models/MyPromise.js'
import UsersMemoryVerses from '../models/UsersMemoryVerses.js'

async function getMyPromise (req, res) {
  const myPromiseCount = await MyPromises.count()

  const { id } = req.user

  const { memoryVersesIndex } = await UsersMemoryVerses.findOne({ user: id })

  let AllPromisesArray = [...Array(myPromiseCount + 1).keys()]

  AllPromisesArray = AllPromisesArray.filter(val => !memoryVersesIndex.includes(val))

  console.log('this is new', AllPromisesArray)

  // console.log('this is one', AllPromisesArray)

  // console.log(memoryVersesIndex)

  try {
    // const random = Math.floor(Math.random() * myPromiseCount)
    const random = AllPromisesArray[Math.floor(Math.random() * AllPromisesArray.length)]
    console.log('this is random', random)
    const myPromises = await MyPromises.findOne().skip(random)
    const userMemoryVerses = await UsersMemoryVerses.findOne({ user: id })
    userMemoryVerses.memoryVersesIndex.push(random)
    await userMemoryVerses.save()
    // console.log('this is money', userMemoryVerses.memoryVersesIndex)
    res.status(200).json({ myPromises })
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { getMyPromise }
