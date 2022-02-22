import Message from "../models/messages/Message";

export default interface MessageDaoI {
    userSendsMessage(uid1: string, uid2: string, message: string): Promise<Message>;
    findSentMessages(uid: string): Promise<Message[]>;
    findReceivedMessages(uid: string): Promise<Message[]>;
    deleteOneMessage(mid: string): Promise<any>;
    deleteAllSentMessage(uid: string): Promise<any>;
    deleteAllReceivedMessage(uid: string): Promise<any>;
}
