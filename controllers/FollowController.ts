import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post('/users/:uid1/follows/:uid2', FollowController.followController.userFollowsAnotherUser);
            app.delete('/users/:uid1/follows/:uid2', FollowController.followController.userUnfollowsAnotherUser);
            app.get('/users/:uid/follows', FollowController.followController.findFollowingUsers);
            app.get('/users/:uid/follows/users', FollowController.followController.findFollowers);
            app.delete('/users/:uid/follows', FollowController.followController.userUnfollowsAllUsers);
            app.put('/follows/:fid', FollowController.followController.userUpdatesFollowingUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(status => res.json(status));

    findFollowingUsers = (req: Request, res: Response) =>
        FollowController.followDao.findFollowingUsers(req.params.uid)
            .then(follows => res.json(follows));

    findFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findFollowers(req.params.uid)
            .then(follows => res.json(follows));

    userUnfollowsAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAllUsers(req.params.uid)
            .then(status => res.json(status));

    userUpdatesFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.userUpdatesFollowingUser(req.params.fid, req.body)
            .then(follow => res.json(follow));
}
