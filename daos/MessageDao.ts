import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
import MessageDaoI from "../interfaces/MessageDaoI";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    async userSendsMessage(uid1: string, uid2: string, message: string): Promise<Message> {
        return await MessageModel.create({message: message, sentTo: uid2, sentBy: uid1});
    }

    async findSentMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({sentBy: uid}).populate("message").exec();
    }

    async findReceivedMessages(uid: string): Promise<Message[]> {
        return await MessageModel.find({sentTo: uid}).populate("message").exec();
    }

    async deleteOneMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({_id: mid});
    }

    async deleteAllSentMessage(uid: string): Promise<any> {
        return await MessageModel.deleteMany({sentBy: uid});
    }

    async deleteAllReceivedMessage(uid: string): Promise<any> {
        return await MessageModel.deleteMany({sentTo: uid});
    }
}
