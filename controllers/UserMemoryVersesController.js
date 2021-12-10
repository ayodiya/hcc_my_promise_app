import UsersMemoryVerses from '../models/UsersMemoryVerses.js'

// @route   get api/userMemoryVerses/getMemoryVerses
// @desc    get memoryVerse
// @access private

async function getMemoryVerses (req, res) {
  const { id } = req.user

  try {
    // find memoryVerse collection linked to the user
    const memoryVerses = await UsersMemoryVerses.find({ user: id })

    res.status(200).json(memoryVerses)
  } catch (error) {
    res.status(502).json({ msg: 'Server Error' })
  }
}

export { getMemoryVerses }
