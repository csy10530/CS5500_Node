/**
 * @file Implements the Like DAO using the LikeModel and mongoose
 * to integrate with MongoDb
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/likes/Like";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class LikeDao Implements the DAO managing data storage of likes
 * @property {LikeDao} followDao single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns LikeDao singleton instance
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Retrieves all users who liked the specific tuit from the database
     * @param tid tuit's primary key
     */
    async findAllUsersThatLikedTuit(tid: string): Promise<Like[]> {
        return await LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }

    /**
     * Retrieves all tuits liked by the specific user from the database
     * @param uid user's primary key
     */
    async findAllTuitsLikedByUser(uid: string): Promise<Like[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }

    async findUserLikesTuit(uid: string, tid: string): Promise<any> {
        return await LikeModel.findOne({tuit: tid, likedBy: uid});
    }

    async countHowManyLikedTuit(tid: string): Promise<any> {
        return await LikeModel.count({tuit: tid});
    }

    /**
     * Removes a like document from the database
     * @param tid tuit's primary key
     * @param uid user's primary key
     */
    async userUnlikesTuit(tid: string, uid: string): Promise<any> {
        return await LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }

    /**
     * Inserts a like document into the database
     * @param tid tuit's primary key
     * @param uid user's primary key
     */
    async userLikesTuit(tid: string, uid: string): Promise<Like> {
        return await LikeModel.create({tuit: tid, likedBy: uid});
    }
}
