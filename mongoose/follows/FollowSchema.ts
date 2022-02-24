/**
 * @file Implements the data schema of follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow represents the schema of follows
 * @property {ObjectId} following represents a user who is followed by another user
 * @property {ObjectId} followedBy represents a user's followers
 */
const FollowSchema = new mongoose.Schema<Follow>({
    following: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'follows'});

export default FollowSchema;
