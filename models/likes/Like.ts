/**
 * @file Declares Like object data model
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like represents a user likes a tuit
 * @property {Tuit} tuit represents a tuit that is liked by a user
 * @property {User} likedBy represents a user who likes a tuit
 */
export default class Like {
    tuit: Tuit | null = null;
    likedBy: User | null = null;
}
