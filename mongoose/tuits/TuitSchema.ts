/**
 * @file Implements the data schema of Tuit
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit represents the data schema of tuit
 * @property {string} tuit represents the content of a tuit
 * @property {Date} postedOn represents the time when the tuit is posted
 * @property {ObjectId} postedBy represents the user who posts the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'tuits'});

export default TuitSchema;
