/**
 * @file RESTful API for Message controller
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post('/users/:uid1/messages/:uid2', MessageController.messageController.userSendsMessage);
            app.get('/users/:uid/messages/out', MessageController.messageController.findSentMessages);
            app.get('/users/:uid/messages/in', MessageController.messageController.findReceivedMessages);
            app.delete('/messages/:mid', MessageController.messageController.deleteOneMessage);
            app.delete('/users/:uid/messages/in', MessageController.messageController.deleteAllReceivedMessage);
            app.delete('/users/:uid/messages/out', MessageController.messageController.deleteAllSentMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));

    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessages(req.params.uid)
            .then(messages => res.json(messages));

    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessages(req.params.uid)
            .then(messages => res.json(messages));

    deleteOneMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteOneMessage(req.params.mid)
            .then(status => res.json(status));

    deleteAllSentMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllSentMessage(req.params.uid)
            .then(status => res.json(status));

    deleteAllReceivedMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllReceivedMessage(req.params.uid)
            .then(status => res.json(status));
}
