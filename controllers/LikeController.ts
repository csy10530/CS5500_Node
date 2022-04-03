/**
 * @file RESTful API for Like controller
 */
import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Request, Response} from "express";
import TuitDao from "../daos/TuitDao";
import DislikeDao from "../daos/DislikeDao";

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
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return LikeController An instance of like controller
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.put('/users/:uid/likes/:tid', LikeController.likeController.userLikesTuit);
            app.delete('/users/:uid/likes/:tid', LikeController.likeController.userUnlikesTuit);
            app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
            app.get('/tuits/:tid/likes', LikeController.likeController.findAllUsersThatLikedTuit);
            app.get('/users/:uid/likes/:tid', LikeController.likeController.findUserLikesTuit);
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
    findAllTuitsLikedByUser = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        let tid = req.params.tid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        try {
            let likes = await LikeController.likeDao.findAllTuitsLikedByUser(userId);
            const tuits = likes.map(likes => likes.tuit);
            res.json(tuits);
        } catch (e) {
            res.sendStatus(503);
        }
    }

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
    userLikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        let tid = req.params.tid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        const tuitIsLiked = await LikeController.likeDao.findUserLikesTuit(userId, tid);
        const tuit = await LikeController.tuitDao.findTuitById(tid);
        let likeCount = await LikeController.likeDao.countHowManyLikedTuit(tid);

        if (tuitIsLiked) {
            tuit.stats.likes = likeCount - 1;
            await LikeController.likeDao.userUnlikesTuit(tid, userId)
                .then(status => LikeController.tuitDao.updateLikes(tid, tuit.stats))
                .then(status => res.sendStatus(200));
        } else {
            tuit.stats.likes =  likeCount + 1;
            await LikeController.likeDao.userLikesTuit(tid, userId)
                .then(status => LikeController.tuitDao.updateLikes(tid, tuit.stats));

            const tuitIsDisliked = await LikeController.dislikeDao.findUserDislikesTuit(userId, tid);
            if (tuitIsDisliked) {
                const dislikeCount = await LikeController.dislikeDao.countDislikesForTuit(tid);
                tuit.stats.dislikes = dislikeCount - 1;
                LikeController.dislikeDao.userUndislikesTuit(tid, userId)
                    .then(status => LikeController.tuitDao.updateLikes(tid, tuit.stats))
                    .then(status => res.sendStatus(200));
            } else {
                res.sendStatus(200);
            }
        }


    }

    findUserLikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        let tid = req.params.tid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        let tuit = await LikeController.likeDao.findUserLikesTuit(userId, tid);
        const stat = tuit ? {"like": true} : {"like": false};
        res.json(stat);
    }

    /*userTogglesTuitLikes = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const likeDao = LikeController.likeDao;
        const tuitDao = LikeController.tuitDao;
        // @ts-ignore
        const profile = req.session["profile"];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
        }
    }*/
}
