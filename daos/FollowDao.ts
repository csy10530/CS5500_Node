/**
 * @file Implements the Follow DAO using the FollowModel and mongoose
 * to integrate with MongoDb
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements the DAO managing data storage of follows
 * @property {FollowDao} followDao single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns FollowDao singleton instance
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Creates a follow instance in the database
     * @param uid1 the first user's primary key
     * @param uid2 the second user's primary key
     */
    async userFollowsAnotherUser(uid1: string, uid2: string): Promise<Follow> {
        return await FollowModel.create({following: uid2, followedBy: uid1});
    }

    /**
     * Removes a follow instance in the database
     * @param uid1 the first user's primary key
     * @param uid2 the second user's primary key
     */
    async userUnfollowsAnotherUser(uid1: string, uid2: string): Promise<any> {
        return await FollowModel.deleteOne({following: uid2, followedBy: uid1});
    }

    /**
     * Retrieve all users followed by the current user from the database
     * @param uid user's primary key
     */
    async findFollowingUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({followedBy: uid}).populate("following").exec();
    }

    /**
     * Retrieve all followers of the current user from the database
     * @param uid user's primary key
     */
    async findFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({following: uid}).populate("followedBy").exec();
    }

    /**
     * Removes all users followed by the current user from the database
     * @param uid user's primary key
     */
    async userUnfollowsAllUsers(uid: string): Promise<any> {
        return await FollowModel.deleteMany({followedBy: uid});
    }

    /**
     * Updates the specific following user in the database
     * @param fid primary key of the follow instance
     * @param follow instance of follow
     */
    async userUpdatesFollowingUser(fid: string, follow: Follow): Promise<any> {
        return await FollowModel.updateOne({_id: fid}, {$set: follow});
    }
}
