import './single.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'

const Single = ({ name }) => {
  const [info, setInfo] = useState({})

  // const location = useLocation()
  // const path = location.pathname.split('/')
  //console.log(path)

  const { userId } = useParams()

  // const getDetails = async () => {
  //   if (name === 'User') {
  //     let data = await axios.get(
  //       `http://localhost:8800/api/${path[1]}/${path[2]}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     //console.log(data)
  //     setInfo(data.data)
  //   } else if (name === 'Hotel') {
  //     let data = await axios.get(
  //       `http://localhost:8800/api/${path[1]}/find/${path[2]}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     //console.log(data)
  //     setInfo(data)
  //   } else if (name === 'Room') {
  //     let data = await axios.get(
  //       `http://localhost:8800/api/${path[1]}/${path[2]}`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     //console.log(data)
  //     setInfo(data)
  //   }
  // }

  useEffect(() => {
    const getDetails = async () => {
      let data = await axios.get(`http://localhost:8800/api/users/${userId}`, {
        withCredentials: true,
      })
      //console.log(data)
      setInfo(data.data)
    }

    getDetails()
  }, [userId])

  //console.log(info)
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <div className='top'>
          {name === 'User' && (
            <div className='left'>
              <div className='editButton'>Edit</div>
              <h1 className='title'>Information</h1>

              <div className='item'>
                <img src={info.img} alt='' className='itemImg' />
                <div className='details'>
                  <h1 className='itemTitle'>{info.username}</h1>
                  <div className='detailItem'>
                    <span className='itemKey'>Email:</span>
                    <span className='itemValue'>{info.email}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Phone:</span>
                    <span className='itemValue'>{info.phone}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Address:</span>
                    <span className='itemValue'>
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Country:</span>
                    <span className='itemValue'>{info.country}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending ( Last 6 Months)' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single
