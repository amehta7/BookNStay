import React from 'react'
import './featuredProperties.css'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('api/hotels?featured=true&limit=4')

  //console.log(data)

  return (
    <div className='fp'>
      {loading ? (
        'Loading...'
      ) : (
        <React.Fragment>
          {data &&
            data.map((d) => (
              <div className='fpItem' key={d._id}>
                <img src={d.photos[0]} alt='Image' className='fpImg' />
                <span className='fpName'>{d.name}</span>
                <span className='fpCity'>{d.city}</span>
                <span className='fpPrice'>
                  Starting from ${d.cheapestPrice}
                </span>

                {d.rating && (
                  <div className='fpRating'>
                    <button>{d.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
        </React.Fragment>
      )}
    </div>
  )
}

export default FeaturedProperties
