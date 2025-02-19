import mongoose, { InferSchemaType, Schema } from "mongoose";


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
    msgByUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    }
}, {
    timestamps: true
})
export type MessageType = InferSchemaType<typeof messageSchema>;

export const MessageModel = mongoose.model('Message', messageSchema)