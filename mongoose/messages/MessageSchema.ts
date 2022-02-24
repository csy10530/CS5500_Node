/**
 * @file Implements the data schema of Message
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message represents the data schema of message
 * @property {string} message represents the content of a message
 * @property {ObjectId} sentTo represents the user who receives the message
 * @property {ObjectId} sentBy represents the user who sent the message
 * @property {Date} sentOn represents the time when the message is sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});

export default MessageSchema;
