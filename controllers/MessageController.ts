/**
 * @file RESTful API for Message controller
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful API for Message Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid1/messages/:uid2 to send a message to another user </li>
 *     <li>GET /users/:uid/messages/out to retrieve all sent messages</li>
 *     <li>GET /users/:uid/messages/in to retrieve all received messages</li>
 *     <li>DELETE /messages/:mid to delete a message/li>
 *     <li>DELETE /users/:uid/messages/in to delete all received messages</li>
 *     <li>DELETE /users/:uid/messages/out to delete all sent messages</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO that implements the message CRUD operations
 * @property {MessageController} messageController Singleton controller that implements the RESTful API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return LikeController An instance of message controller
     */
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

    /**
     * Inserts a message document into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));

    /**
     * Retrieves all message documents sent from the specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all message documents received by the specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Removes a specific message document from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    deleteOneMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteOneMessage(req.params.mid)
            .then(status => res.json(status));

    /**
     * Removes all messages sent from a specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    deleteAllSentMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllSentMessage(req.params.uid)
            .then(status => res.json(status));

    /**
     * Removes all messages received by a specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    deleteAllReceivedMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllReceivedMessage(req.params.uid)
            .then(status => res.json(status));
}
