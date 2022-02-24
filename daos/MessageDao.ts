/**
 * @file Implements the Message DAO using the MessageModel and mongoose
 * to integrate with MongoDb
 */
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements the DAO managing data storage of messages
 * @property {MessageDao} followDao single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns MessageDao singleton instance
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Inserts a message document into the database
     * @param uid1 the first user's primary key
     * @param uid2 the second user's primary key
     * @param message message body
     */
    async userSendsMessage(uid1: string, uid2: string, message: Message): Promise<Message> {
        return await MessageModel.create({...message, sentTo: uid2, sentBy: uid1});
    }

    /**
     * Retrieves all message documents sent from the specific user from the database
     * @param uid user's primary key
     */
    async findSentMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({sentBy: uid}).populate("sentTo").exec();
    }

    /**
     * Retrieves all message documents received by the specific user from the database
     * @param uid user's primary key
     */
    async findReceivedMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({sentTo: uid}).populate("sentBy").exec();
    }

    /**
     * Removes a specific message document from the database
     * @param mid message's primary key
     */
    async deleteOneMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({_id: mid});
    }

    /**
     * Removes all messages sent from a specific user from the database
     * @param uid user's primary key
     */
    async deleteAllSentMessage(uid: string): Promise<any> {
        return await MessageModel.deleteMany({sentBy: uid});
    }

    /**
     * Removes all messages received by a specific user from the database
     * @param uid user's primary key
     */
    async deleteAllReceivedMessage(uid: string): Promise<any> {
        return await MessageModel.deleteMany({sentTo: uid});
    }
}
