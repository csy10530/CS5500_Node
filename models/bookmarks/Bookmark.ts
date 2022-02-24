/**
 * @file Declares Bookmark object data model
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents a bookmark of a tuit
 * @property {Tuit} tuit represents a bookmarked tuit
 * @property {User} bookmarkedBy represents a user who bookmarked the tuit
 */
export default class Bookmark {
    private tuit: Tuit | null = null;
    private bookmarkedBy: User | null = null;
}
