import MyPromises from '../models/MyPromise.js'
import UsersMemoryVerses from '../models/UsersMemoryVerses.js'

// @route   get api/mypromise
// @desc    reset password
// @access public

async function getMyPromise (req, res) {
  let myPromisesIdArray = []
  const { id } = req.user

  // find user memory verse in UsersMemoryVerses collection
  const userMemoryVerses = await UsersMemoryVerses.findOne({ user: id })

  // get all promises id
  const myPromisesId = await MyPromises.find({}).select('_id')

  // push id as string into mypromisesIdArray
  myPromisesId.forEach(element => myPromisesIdArray.push(element.id))

  // remove number if user has already gotten the number before
  if (userMemoryVerses) {
    myPromisesIdArray = myPromisesIdArray.filter(val => !userMemoryVerses.memoryVersesIndex.includes(val))
  }

  // generate a random number from allPromisesArray
  const random = myPromisesIdArray[Math.floor(Math.random() * myPromisesIdArray.length)]

  try {
    // get promise from the myPromises collection corresponding  to the randomly generated number
    const myPromise = await MyPromises.findById(random)

    // return if myPromise equals to null
    if (myPromise == null) {
      return res.status(502).json({ msg: 'Server Error, Please Try Again.' })
    }

    //  if user does not have any data in UsersMemoryVerses  create else update
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
