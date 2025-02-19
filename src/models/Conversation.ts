import mongoose, { InferSchemaType, Schema } from "mongoose";



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

export type ConversationType = InferSchemaType<typeof conversationSchema>;

export const ConversationModel = mongoose.model('Conversation', conversationSchema)