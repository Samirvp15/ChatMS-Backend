import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/connectDB'
import { router } from './routes/index'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

// MIDDLEWARES
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL || '',
        'http://localhost:8080'],
    credentials: true,
}))



app.use('/api', router)


const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.json({
        xxd: 'Holaaa MUNDo'
    })
})





connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server running at: ', PORT)
    })
})
