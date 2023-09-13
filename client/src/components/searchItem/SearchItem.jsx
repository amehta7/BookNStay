import React from 'react'
import './searchItem.css'
import { Link } from 'react-router-dom'

const SearchItem = () => {
  return (
    <div className='searchItem'>
      <img
        src='https://cf.bstatic.com/xdata/images/hotel/square600/446996927.webp?k=9e58d05ce9df3fbe97dbd1af9d2825c907a50650b5e40b6ac84df7b26203926e&o='
        alt='Image'
        className='siImg'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>
          Residence Inn By Marriott Las Vegas Stadium Area
        </h1>
        <span className='siDistance'>distance from center</span>
        <span className='siTaxiOp'>Free airport taxi</span>
        <span className='siSubtitle'>
          Studio Apartment with Air conditioning
        </span>
        <span className='siFeatures'>desc</span>
        <span className='siCancelOp'>Free cancellation </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span>Excellent</span>
          <button>8.5</button>
        </div>

        <div className='siDetailTexts'>
          <span className='siPrice'>$ 250</span>
          <span className='siTaxOp'>Includes taxes and fees</span>
          <Link to='/hotels/3'>
            <button className='siCheckButton'>See availability </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
