import User from '../models/User.js'

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      res.status(500).json({ msg: 'There is no any user with this ID.' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    if (!user) {
      res.status(500).json({ msg: 'There is no any user with this ID.' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    await User.findByIdAndDelete(id)

    res.status(200).json({ msg: 'User deleted successfully!' })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
