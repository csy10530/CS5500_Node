import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, required: true, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});

export default TuitSchema;
