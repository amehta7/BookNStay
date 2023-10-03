import { createError } from '../middleware/error.js'
import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createRoom = async (req, res, next) => {
  try {
    const { hotelId } = req.params
    const newRoom = new Room(req.body)

    const savedRoom = await newRoom.save()

    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })

    res.status(200).json(savedRoom)
  } catch (error) {
    next(error)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    if (!updatedRoom) {
      res.status(500).json({ msg: 'There is no any room with this ID.' })
      return
    }

    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    )
    res.status(200).json('Room status has been updated.')
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  try {
    const { id, hotelId } = req.params

    await Room.findByIdAndDelete(id)

    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: id },
    })

    res.status(200).json('Room has been deleted.')
  } catch (error) {
    next(error)
  }
}

export const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params

    const room = await Room.findById(id)

    if (!room) {
      res.status(500).json({ msg: 'There is no any room with this ID.' })
      return
    }

    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()

    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}
