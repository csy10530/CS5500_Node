/**
 * @file Declares the interface of Message's data access object methods
 */
import Message from "../models/messages/Message";

export default interface MessageDaoI {
    userSendsMessage(uid1: string, uid2: string, message: Message): Promise<Message>;
    findSentMessages(uid: string): Promise<Message[]>;
    findReceivedMessages(uid: string): Promise<Message[]>;
    deleteOneMessage(mid: string): Promise<any>;
    deleteAllSentMessage(uid: string): Promise<any>;
    deleteAllReceivedMessage(uid: string): Promise<any>;
}
