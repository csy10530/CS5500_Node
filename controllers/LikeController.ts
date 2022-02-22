import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Request, Response} from "express";

export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
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

    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(users => res.json(users));

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(tuits => res.json(tuits));

    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.json(status));

    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then(like => res.json(like));
}
