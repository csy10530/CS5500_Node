/**
 * @file RESTful API for Like controller
 */
import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Request, Response} from "express";

/**
 * @class LikeController Implements RESTful API for Like Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/likes/:tid to like a tuit</li>
 *     <li>DELETE /users/:uid/likes/:tid to unlike a tuit</li>
 *     <li>GET /users/:uid/likes to retrieve all liked tuits</li>
 *     <li>GET /tuits/:tid/likes to retrieve all users who liked the tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO that implements the like CRUD operations
 * @property {LikeController} likeController Singleton controller that implements the RESTful API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return LikeController An instance of like controller
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post('/users/:uid/likes/:tid', LikeController.likeController.userLikesTuit);
            app.delete('/users/:uid/likes/:tid', LikeController.likeController.userUnlikesTuit);
            app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
            app.get('/tuits/:tid/likes', LikeController.likeController.findAllUsersThatLikedTuit);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    /**
     * Retrieves all users who liked the specific tuit from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(users => res.json(users));

    /**
     * Retrieves all tuits liked by the specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(tuits => res.json(tuits));

    /**
     * Removes a like document from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.json(status));

    /**
     * Inserts a like document into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then(like => res.json(like));
}
