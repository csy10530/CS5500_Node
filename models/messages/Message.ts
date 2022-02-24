/**
 * @file Declares Message object data model
 */
import User from "../users/User";

/**
 * @typedef Message represents a message sent by a user
 * @property {string} message represents the message to be sent
 * @property {User} sentTo represents a user who receives the message
 * @property {User} sentBy represents a user who sends the message
 * @property {Date} sentOn represents the time when the message was sent
 */
export default class Message {
    private message: string | null = null;
    private sentTo: User | null = null;
    private sentBy: User | null = null;
    private sentOn: Date = new Date();
}
