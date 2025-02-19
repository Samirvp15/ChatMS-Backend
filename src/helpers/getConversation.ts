import { ConversationModel } from "../models/Conversation"
import { Document, Types } from "mongoose";

// interface IMessage extends Document {
//     text: string;
//     imageURL: string;
//     videoURL: string;
//     seen: boolean;
//     msgByUserId: Types.ObjectId; // O también puede ser string si así lo prefieres
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface IConversation extends Document {
//     sender: Types.ObjectId;
//     receiver: Types.ObjectId;
//     messages: IMessage[];
//     createdAt: Date;
//     updatedAt: Date;
// }

interface PopulatedMessage extends Document {
    text?: string;
    imageURL?: string;
    videoURL?: string;
    seen: boolean;
    msgByUserId: Types.ObjectId;
}
export const getConversation = async (currentUserId: string) => {
    if (currentUserId) {
        const currentUserConversation = await ConversationModel.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        })
        .sort({ updatedAt: -1 })
        .populate<{ messages: PopulatedMessage[] }>('messages')
        .populate('sender')
        .populate('receiver')

        const conversation = currentUserConversation.map((conv) => {
            const countUnseenMsg = conv.messages.reduce((prev, curr) => {
                const msgByUserId = String(curr?.msgByUserId) // ✅ Convertimos el ObjectId a string

                if (msgByUserId !== currentUserId) {
                    return prev + (curr?.seen ? 0 : 1) // ✅ curr?.seen siempre existirá, porque el modelo lo define como booleano
                } else {
                    return prev
                }
            }, 0)

            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnseenMsg,
                lastMsg: conv.messages[conv?.messages?.length - 1]
            }
        })

        return conversation
    } else {
        return []
    }
}