import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { getUserDetailsFromToken } from '../helpers/getDetailsFromToken'
import { userModel } from '../models/User'
import { ConversationModel, ConversationType } from '../models/Conversation'
import { MessageModel, MessageType } from '../models/Message'
import { getConversation } from '../helpers/getConversation'

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

    type CombinedType = MessageType & ConversationType;


    //New Message
    socket.on('new-message', async(data : CombinedType )=>{

        let conversation = await ConversationModel.findOne({
            "$or": [
                {
                    sender: data.sender,
                    receiver: data.receiver
                },
                {
                    sender: data.receiver,
                    receiver: data.sender
                },
            ]
        })

          //if conversation is not available
          if(!conversation){
            const createConversation = new ConversationModel({
                sender : data?.sender,
                receiver : data?.receiver
            })
            
            conversation = await createConversation.save()
        }

        const message = new MessageModel({
            text : data.text,
            imageURL : data.imageURL,
            videoURL : data.videoURL,
            msgByUserId :  data.msgByUserId,
          })
          const saveMessage = await message.save()
  
          const updateConversation = await ConversationModel.updateOne({ _id : conversation?._id },{
              "$push" : { messages : saveMessage?._id }
          })
  
          const getConversationMessage = await ConversationModel.findOne({
              "$or" : [
                  { sender : data?.sender, receiver : data?.receiver },
                  { sender : data?.receiver, receiver :  data?.sender}
              ]
          }).populate('messages').sort({ updatedAt : -1 })
  
  
          io.to(data.sender.toString()).emit('message',getConversationMessage?.messages || [])
          io.to(data.receiver.toString()).emit('message',getConversationMessage?.messages || [])
  
          //send conversation
          const conversationSender = await getConversation(data.sender.toString())
          const conversationReceiver = await getConversation(data.receiver.toString())
  
          io.to(data.sender.toString()).emit('conversation',conversationSender)
          io.to(data.receiver.toString()).emit('conversation',conversationReceiver)

        console.log('conversation: ', conversation)

    })

    socket.on("disconnect", () => {
        onlineUser.delete(user._id?.toString())
        io.emit('onlineUser', Array.from(onlineUser)) 
    });
});

//server.listen(3000);