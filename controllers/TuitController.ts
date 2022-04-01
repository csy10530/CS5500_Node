/**
 * @file RESTful API for Tuit controller
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful API for Tuit Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all tuits</li>
 *     <li>GET /tuits/:tid to retrieve a tuit by its id</li>
 *     <li>GET /users/:uid/tuits to retrieve a tuit by user</li>
 *     <li>POST /tuits to create a new tuit/li>
 *     <li>POST /users/:uid/tuits to create a tuit by user</li>
 *     <li>DELETE /tuits/:tid to delete a tuit by id</li>
 *     <li>PUT /tuits/:tid to update a tuit</li>
 * </ul>
 * @property {TuitDao} userDao Singleton DAO that implements the tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller that implements the RESTful API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return LikeController An instance of tuit controller
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/tuits', TuitController.tuitController.createTuit);
            app.post('/users/:uid/tuits', TuitController.tuitController.createTuitByUser);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);

            app.get('/users/:uid/tuits/delete', TuitController.tuitController.deleteTuitsByUser);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    /**
     * Removes a specific tuit document from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Inserts a tuit document into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    /**
     * Inserts a tuit document by user into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    createTuitByUser = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        TuitController.tuitDao.createTuitByUser(req.params.uid, req.body)
            .then(tuit => res.json(tuit));
    }

    /**
     * Retrieves all tuits from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Retrieves a specific tuit by its id from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Retrieves all tuit documents posted by a specific user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findTuitsByUser = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
            //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));
    }

    /**
     * Updates a specific tuit document in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

    deleteTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitsByUser(req.params.uid)
            .then(status => res.json(status));
}
