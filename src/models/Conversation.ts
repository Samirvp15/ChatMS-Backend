import mongoose, { Schema } from "mongoose";



const conversationSchema = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Message'
    }],
},{
    timestamps: true
})

export const ConversationModel = mongoose.model('Conversation', conversationSchema)