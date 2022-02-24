/**
 * @file Declares Follow object data model
 */
import User from "../users/User";

/**
 * @typedef Follow Represents a user follows another user
 * @property {User} following represents a user who is followed by another user
 * @property {User} followedBy represents a user who follows another user
 */
export default class Follow {
    private following: User | null = null;
    private followedBy: User | null = null;
}
