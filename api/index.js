import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

//mongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to mongoDB.')
  } catch (error) {
    console.log(error)
  }
}

//middlewares
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Welcome!!!')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8800, () => {
  connect()
  console.log('Connected to backend.')
})
