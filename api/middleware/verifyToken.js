import jwt from 'jsonwebtoken'
import { createError } from '../middleware/error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, 'Token is not valid!'))
    }

    req.user = user
    next()
  })
}

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    if (payload.id === req.params.id || payload.isAdmin) {
      // console.log(payload.id, req.params.id)
      req.user = payload
      next()
    } else {
      return next(
        createError(403, 'You are not authorized to access this endpoint!')
      )
    }
  } catch (error) {
    return next(createError(403, 'Token is not valid!'))
  }
}

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    if (payload.isAdmin) {
      req.user = payload
      next()
    } else {
      return next(
        createError(403, 'You are not authorized to access this endpoint!')
      )
    }
  } catch (error) {
    return next(createError(403, 'Token is not valid!'))
  }
}
