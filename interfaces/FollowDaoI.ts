import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    userFollowsAnotherUser(uid1: string, uid2: string): Promise<Follow>;
    userUnfollowsAnotherUser(uid1: string, uid2: string): Promise<any>;
    findFollowingUsers(uid: string): Promise<Follow[]>;
    findFollowers(uid: string): Promise<Follow[]>;
    findFollowersOfAnohterUser(uid: string): Promise<Follow[]>;
    findUsersFollowedByAnotherUser(uid: string): Promise<Follow[]>;
}
