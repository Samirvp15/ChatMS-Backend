import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    text: {
        type: String,
        default: '',
    },
    imageURL: {
        type: String,
        default: '',
    },
    videoURL: {
        type: String,
        default: '',
    },
    seen: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

export const MessageModel = mongoose.model('Message', messageSchema)