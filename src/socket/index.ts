import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { getUserDetailsFromToken } from '../helpers/getDetailsFromToken'
import { userModel } from '../models/User'

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

io.on("connection", async (socket) => {
    // ...
    //console.log('Usuario conectado: ', socket.id)
    const token = socket.handshake.auth.token

    //Current user Details
    const user = await getUserDetailsFromToken(token)

    //Create room
    socket.join(user._id || [''])
    onlineUser.add(user._id?.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async (userId: string) => {
        const userDetails = await userModel.findById(userId)
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId)
        }

        socket.emit('message-user', payload)
    })

    //New Message
    socket.on('new-message',(data)=>{
        console.log('new messsage: ', data)
    })

    socket.on("disconnect", () => {
        onlineUser.delete(user._id?.toString())
        io.emit('onlineUser', Array.from(onlineUser)) 
    });
});

//server.listen(3000);