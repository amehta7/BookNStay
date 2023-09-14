import React, { useState } from 'react'
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

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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

  return (
    <div>
      <Navbar />
      <Header type='list' />
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
                src={photos[slideNumber].src}
                alt='Image'
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
          <h1 className='hotelTitle'>
            Residence Inn By Marriott Las Vegas Stadium Area
          </h1>
          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              5875 Dean Martin Drive, Las Vegas, NV 89118, United States of
              America
            </span>
          </div>
          <span className='hotelDistance'>
            Excellent location – 89m from center
          </span>
          <span className='hotelPriceHighlight'>
            Book a stay over $34 at this property and get a free airport taxi
          </span>
          <div className='hotelImages'>
            {photos.map((p, index) => (
              <div className='hotelImgWrapper' key={index}>
                <img
                  src={p.src}
                  alt='Image'
                  className='hotelImg'
                  onClick={() => handleOpen(index)}
                />
              </div>
            ))}
          </div>
          <div className='hotelDetails'>
            <div className='hotelDetailsTexts'>
              <h1 className='hotelTitle'>title</h1>
              <p className='hotelDesc'>
                Residence Inn By Marriott Las Vegas Stadium Area provides a free
                grab-and-go breakfast. The self-catering studios and suites
                include free WiFi, and parking is available onsite. The spacious
                guest rooms include a fully-equipped kitchen and a dining area.
                A seating area provides a cable TV with premium channels and a
                sofa bed. A heated outdoor pool, hot tub and a modern fitness
                center with a multi-purpose sport court are provided for guest
                use. BBQ facilities are located on site. A grocery shopping
                service is available.
              </p>
            </div>
            <div className='hotelDetailsPrice'>
              <h1>Perfect for a days-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$days * cheapestPrice * room</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Hotel
