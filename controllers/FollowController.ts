/**
 * @file RESTful API for Follow controller
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

/**
 * @class FollowController Implements RESTful API for Follow Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid1/follows/:uid2 to follow a user</li>
 *     <li>DELETE /users/:uid1/follows/:uid2 to unfollow a user</li>
 *     <li>GET /users/:uid/follows to retrieve following users</li>
 *     <li>GET /users/:uid/follows/users to retrieve all followers</li>
 *     <li>DELETE /users/:uid/follows to remove all following users</li>
 *     <li>PUT /follows/:fid to update a following user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO that implements the follow CRUD operations
 * @property {FollowController} followController Singleton controller that implements the RESTful API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return FollowController An instance of follow controller
     */
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

    /**
     * Creates a follow instance in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));

    /**
     * Removes a follow instance in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(status => res.json(status));

    /**
     * Retrieve all users followed by the current user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findFollowingUsers = (req: Request, res: Response) =>
        FollowController.followDao.findFollowingUsers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieve all followers of the current user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findFollowers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Removes all users followed by the current user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUnfollowsAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAllUsers(req.params.uid)
            .then(status => res.json(status));

    /**
     * Updates the specific following user in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUpdatesFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.userUpdatesFollowingUser(req.params.fid, req.body)
            .then(follow => res.json(follow));
}
