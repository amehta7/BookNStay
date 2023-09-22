import express from 'express'
import { verifyAdmin } from '../middleware/verifyToken.js'
import {
  createRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js'

const router = express.Router()

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom)

//UPDATE
router.put('/availability/:id', updateRoomAvailability)
router.put('/:id', verifyAdmin, updateRoom)

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)

//GET
router.get('/:id', getRoom)

//GET ALL
router.get('/', getAllRooms)

export default router
