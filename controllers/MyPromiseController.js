import MyPromises from '../models/MyPromise.js'
import UsersMemoryVerses from '../models/UsersMemoryVerses.js'

async function getMyPromise (req, res) {
  const { id } = req.user
  const myPromisesCount = await MyPromises.count()
  const userMemoryVerses = await UsersMemoryVerses.findOne({ user: id })
  let AllPromisesArray = [...Array(myPromisesCount + 1).keys()]

  if (userMemoryVerses) {
    AllPromisesArray = AllPromisesArray.filter(val => !userMemoryVerses.memoryVersesIndex.includes(val))
  }

  const random = AllPromisesArray[Math.floor(Math.random() * AllPromisesArray.length)]

  try {
    const myPromise = await MyPromises.findOne().skip(random)

    if (myPromise == null) {
      return res.status(502).json({ msg: 'Server Error, Please Try Again.' })
    }

    if (!userMemoryVerses) {
      await UsersMemoryVerses.create({
        user: id,
        memoryVerses: [
          {
            memoryVerse: myPromise?.memoryVerse,
            memoryVerseText: myPromise?.memoryVerseText,
            createdAt: Date.now()
          }
        ],
        memoryVersesIndex: random
      })
    } else {
      await UsersMemoryVerses.updateOne(
        { user: id },
        {
          $push: {
            memoryVerses: {
              $each: [
                {
                  memoryVerse: myPromise?.memoryVerse,
                  memoryVerseText: myPromise?.memoryVerseText,
                  createdAt: Date.now()
                }
              ],
              $position: 0
            },
            memoryVersesIndex: {
              $each: [
                random
              ]
            }
          }
        }
      )
    }

    res.status(200).json(myPromise)
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { getMyPromise }
