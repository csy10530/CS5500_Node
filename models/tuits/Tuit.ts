/**
 * @file Declares Tuit object data model
 */
import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit represents a tuit
 * @property {string} tuit represents a tuit's content
 * @property {Date} postedOn represents the time when the tuit is posted
 * @property {User} postedBy represents the user who posted the tuit
 */
export default interface Tuit {
    tuit: string,
    postedOn?: Date,
    postedBy: User,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
}
