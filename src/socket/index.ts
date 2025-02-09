import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { getUserDetailsFromToken } from '../helpers/getDetailsFromToken'

export const app = express()

//SOCKET CONNECTION
export const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [`${process.env.FRONTEND_URL}` || 'http://localhost:8080'],
        credentials: true,
    }
});

//Online user
const onlineUser = new Set()

io.on("connection",async (socket) => {
    // ...
    console.log('Usuario conectado: ', socket.id)
    const token = socket.handshake.auth.token

    //Current user Details
    const user = await getUserDetailsFromToken(token)

    //Create room
    socket.join(user._id || [''])
    onlineUser.add(user._id)

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on("disconnect", () => {
        console.log('Usuario desconectado: ', socket.id)
    });
});

//server.listen(3000);