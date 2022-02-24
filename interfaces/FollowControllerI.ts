/**
 * @file Declares the interface for the Follow controller
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findFollowingUsers(req: Request, res: Response): void;
    findFollowers(req: Request, res: Response): void;
    userUnfollowsAllUsers(req: Request, res: Response): void;
    userUpdatesFollowingUser(req: Request, res: Response): void;
}
