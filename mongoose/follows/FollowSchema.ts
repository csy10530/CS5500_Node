import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    following: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'follows'});

export default FollowSchema;
