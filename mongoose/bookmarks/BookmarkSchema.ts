import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: 'bookmarks'});

export default BookmarkSchema;
