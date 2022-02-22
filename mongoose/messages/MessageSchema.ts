import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: 'messages'});

export default MessageSchema;
