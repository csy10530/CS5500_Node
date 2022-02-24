/**
 * @file Declares the interface of Follow's data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    userFollowsAnotherUser(uid1: string, uid2: string): Promise<Follow>;
    userUnfollowsAnotherUser(uid1: string, uid2: string): Promise<any>;
    findFollowingUsers(uid: string): Promise<Follow[]>;
    findFollowers(uid: string): Promise<Follow[]>;
    userUnfollowsAllUsers(uid: string): Promise<any>;
    userUpdatesFollowingUser(fid: string, follow: Follow): Promise<any>;
}
