import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <div className='homeContainer'></div>
    </React.Fragment>
  )
}

export default Home
