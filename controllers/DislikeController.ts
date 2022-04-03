import DislikeControllerI from "../interfaces/DislikeControllerI";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";

export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInsatnce = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.put("/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
            app.delete("/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
            app.get("/users/:uid/dislikes/:tid", DislikeController.dislikeController.findUserDislikesTuit);
        }

        return DislikeController.dislikeController;
    }

    private constructor() {}

    findAllUsersThatDislikedTuit = (req: Request, res: Response) => {
        DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));
    }

    findAllTuitsDislikedByUser = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        try {
            let dislikedTuits = await DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId);
            const tuits = dislikedTuits.map(dislikes => dislikes.tuit);
            res.json(tuits);
        } catch (e) {
            res.sendStatus(503);
        }
    }

    userUndislikesTuit = (req: Request, res: Response) => {
        DislikeController.dislikeDao.userUndislikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }

    userDislikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        let tid = req.params.tid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        const tuitIsDisliked = await DislikeController.dislikeDao.findUserDislikesTuit(userId, tid);
        const tuit = await DislikeController.tuitDao.findTuitById(tid);
        let dislikeCount = await DislikeController.dislikeDao.countDislikesForTuit(tid);

        if (tuitIsDisliked) {
            tuit.stats.dislikes = dislikeCount - 1;

            DislikeController.dislikeDao.userUndislikesTuit(tid, userId)
                .then(status => DislikeController.tuitDao.updateLikes(tid, tuit.stats))
                .then(status => res.sendStatus(200));
        } else {
            tuit.stats.dislikes = dislikeCount + 1;

            DislikeController.dislikeDao.userDislikesTuit(tid, userId)
                .then(status => DislikeController.tuitDao.updateLikes(tid, tuit.stats));

            const tuitIsLiked = await DislikeController.likeDao.findUserLikesTuit(userId, tid);
            if (tuitIsLiked) {
                const likeCount = await DislikeController.likeDao.countHowManyLikedTuit(tid);
                tuit.stats.likes = likeCount - 1;
                DislikeController.likeDao.userUnlikesTuit(tid, userId)
                    .then(status => DislikeController.tuitDao.updateLikes(tid, tuit.stats))
                    .then(status => res.sendStatus(200));
            } else {
                res.sendStatus(200);
            }
        }
    }

    findUserDislikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        //@ts-ignore
        && req.session["profile"] ? req.session["profile"]._id : req.params.uid;

        if (userId === "me") {
            res.sendStatus(503);
            return;
        }

        let tuit = await DislikeController.dislikeDao.findUserDislikesTuit(userId, req.params.tid);
        const stat = tuit ? {"dislike": true} : {"dislike": false};
        res.json(stat);
    }
}
