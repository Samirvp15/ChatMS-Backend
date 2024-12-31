import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use( cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))


const PORT = process.env.PORT || 8080

app.get('/', (req, res)=>{
    res.json({
        xxd: 'Holaaa MUNDo'
    })
})

app.listen(PORT, ()=>{
    console.log('Server running at: ', PORT )
})


