import Hotel from '../models/Hotel.js'

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params

    const hotel = await Hotel.findById(id)

    if (!hotel) {
      res.status(500).json({ msg: 'There is no any hotel with this ID.' })
      return
    }

    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body)
    //console.log(req.body)

    if (!req.body) {
      res.status(500).json({ msg: 'Please provide all hotel details' })
      return
    }

    const savedHotel = await newHotel.save()

    res.status(200).json(savedHotel)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    if (!hotel) {
      res.status(500).json({ msg: 'There is no any hotel with this ID.' })
      return
    }

    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params

    await Hotel.findByIdAndDelete(id)

    res.status(200).json({ msg: 'Hotel deleted successfully!' })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()

    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const countByCity = async (req, res) => {}

export const countByType = async (req, res) => {}

export const getHotelRooms = async (req, res) => {}
