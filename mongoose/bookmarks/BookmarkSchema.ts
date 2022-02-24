/**
 * @file Implements the data schema of Bookmark
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark represents a bookmark of a tuit
 * @property {ObjectId} tuit represents the bookmarked tuit
 * @property {ObjectId} bookmarkedBy represents the user who bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'bookmarks'});

export default BookmarkSchema;
