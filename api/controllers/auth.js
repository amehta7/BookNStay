import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from '../middleware/error.js'

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPwd = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      ...req.body,
      password: hashedPwd,
    })

    await newUser.save()

    res.status(200).json({ msg: 'User has been created.' })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      return next(createError(404, 'User not found!'))
    }

    const isPwdCorrect = await bcrypt.compare(req.body.password, user.password)

    if (!isPwdCorrect)
      return next(createError(400, 'Wrong password or username!'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    )
    const { password, isAdmin, ...otherDetails } = user._doc

    //console.log(otherDetails)

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (error) {
    next(error)
  }
}
