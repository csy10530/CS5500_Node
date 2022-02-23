import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findFollowingUsers(req: Request, res: Response): void;
    findFollowers(req: Request, res: Response): void;
    userUnfollowsAllUsers(req: Request, res: Response): void;
    userDeletesAllFollowers(req: Request, res: Response): void;
}
