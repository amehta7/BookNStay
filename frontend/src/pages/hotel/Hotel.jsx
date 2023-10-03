import React, { useState, useContext } from 'react'
import './hotel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { id } = useParams()

  //console.log(id)

  // const location = useLocation()

  // console.log(location.pathname.split('/'))
  // const id = location.pathname.split('/')[2]

  const navigate = useNavigate()

  const { dates, options } = useContext(SearchContext)

  //console.log(dates)

  const { user } = useContext(AuthContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  //console.log(days)

  const { data, loading, error } = useFetch(`/hotels/find/${id}`)

  //console.log(data)

  const photos = [
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446996947.jpg?k=1d3f2d577631f8e2dacca97fa694b96d78f843b1530db7a41af88bb51b4aa3b0&o=&hp=1',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446996960.jpg?k=9ceecd3b7755db5050d557f1f3f02f167a9d16808fdedc09e12a706cca1b43ab&o=&hp=1',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446996976.jpg?k=91305c39956c89e5f9b876171a5d16d8192b56dbf0a6c2e3ec0397451c3dcc91&o=&hp=1',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446997031.jpg?k=bb3dd850b3cc5183f47b37e16e5d308e8edbd4bea7278c8a1bc750618c1b785b&o=&hp=1',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446997019.jpg?k=dd5a4fea471197a692e5b8956c918f6d4ad4eaceddb2faeae40e173ecb5d7f12&o=&hp=1',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446997077.jpg?k=81fa96d2c8c7cce7c1f8aa62a1372fd11b90d2ca38f051e7e0ce9c7fb9e5b2c9&o=&hp=1',
    },
  ]

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (action) => {
    let newSlideNumber

    if (action === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else if (action === 'r') {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        'loading'
      ) : (
        <div className='hotelContainer'>
          {open && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='sliderWrapper'>
                <img
                  src={data.photos[slideNumber]}
                  alt='HotelImage'
                  className='sliderImg'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className='hotelWrapper'>
            <button className='bookNow'>Reserve or Book Now!</button>
            <h1 className='hotelTitle'>{data.name}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location – {data.distance}m from center
            </span>
            <span className='hotelPriceHighlight'>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className='hotelImages'>
              {data.photos?.map((p, index) => (
                <div className='hotelImgWrapper' key={index}>
                  <img
                    src={p}
                    alt='HotelImage'
                    className='hotelImg'
                    onClick={() => handleOpen(index)}
                  />
                </div>
              ))}
            </div>
            <div className='hotelDetails'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{data.title}</h1>
                <p className='hotelDesc'>{data.desc}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{' '}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
