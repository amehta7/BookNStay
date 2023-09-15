import express from 'express'
import {
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from '../controllers/hotel.js'

const router = express.Router()

//GET
router.get('/find/:id', getHotel)

//CREATE
router.post('/', createHotel)

//UPDATE
router.put('/:id', updateHotel)

//DELETE
router.delete('/:id', deleteHotel)

//GET ALL
router.get('/', getAllHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)

export default router
