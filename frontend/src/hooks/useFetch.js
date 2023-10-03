import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URI = 'http://localhost:8800/api'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${BASE_URI}${url}`)
        setData(res.data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [url])

  const reFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URI}${url}`)
      setData(res.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return { data, loading, error, reFetch }
}

export default useFetch

//"proxy": "http://localhost:8800/api",
