import UsersMemoryVerses from '../models/UsersMemoryVerses.js'
import User from '../models/User.js'

async function addMemoryVerse (req, res) {
  const { memoryVerse, memoryVerseText } = req.body
  const { id } = req.user

  try {
    const userExist = await User.findOne({ _id: id })

    if (!userExist) {
      return res.status(404).json({ msg: 'User does not exist' })
    }

    const user = await UsersMemoryVerses.findOne({ user: id })

    if (user) {
      await UsersMemoryVerses.updateOne(
        { user: id },
        {
          $push: {
            memoryVerses: {
              $each: [
                {
                  memoryVerse: memoryVerse,
                  memoryVerseText: memoryVerseText,
                  createdAt: Date.now()
                }
              ],
              $position: 0
            }
          }
        }
      )

      return res.status(201)
    }
    await UsersMemoryVerses.create({
      user: req.user.id,
      memoryVerses: [
        {
          memoryVerse: memoryVerse,
          memoryVerseText: memoryVerseText,
          createdAt: Date.now()
        }
      ]
    })

    res.status(201)
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

async function getMemoryVerses (req, res) {
  const { id } = req.user

  try {
    const memoryVerses = await UsersMemoryVerses.find({ user: id })

    res.status(200).json(memoryVerses)
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { addMemoryVerse, getMemoryVerses }
