import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Message',
            default: []
        }
    ]




}, { timestamps: true })

const chatModel = mongoose.model("Chat", chatSchema)
export default chatModel