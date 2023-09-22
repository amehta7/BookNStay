import Hotel from '../models/Hotel.js'

export const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params

    const hotel = await Hotel.findById(id)

    if (!hotel) {
      res.status(500).json({ msg: 'There is no any hotel with this ID.' })
      return
    }

    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const createHotel = async (req, res, next) => {
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
    next(error)
  }
}

export const updateHotel = async (req, res, next) => {
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
    next(error)
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params

    await Hotel.findByIdAndDelete(id)

    res.status(200).json({ msg: 'Hotel deleted successfully!' })
  } catch (error) {
    next(error)
  }
}

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query

  //console.log(others)
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit)

    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(
      cities.map((c) => {
        return Hotel.countDocuments({ city: c })
      })
    )

    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const resortCount = await Hotel.countDocuments({ type: 'resort' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' })

    res.status(200).json([
      { type: 'hotels', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ])
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {}
