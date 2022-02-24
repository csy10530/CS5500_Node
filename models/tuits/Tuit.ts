/**
 * @file Declares Tuit object data model
 */
import User from "../users/User";

/**
 * @typedef Tuit represents a tuit
 * @property {string} tuit represents a tuit's content
 * @property {Date} postedOn represents the time when the tuit is posted
 * @property {User} postedBy represents the user who posted the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
