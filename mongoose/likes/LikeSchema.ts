/**
 * @file Implements the data schema of Like
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like represents the data schema of likes
 * @property {ObjectId} tuit represents the content of the liked tuit
 * @property {ObjectId} likedBy represents the user who liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'likes'});

export default LikeSchema;
