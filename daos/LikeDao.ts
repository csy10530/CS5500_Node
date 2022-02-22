import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/likes/Like";
import LikeModel from "../mongoose/likes/LikeModel";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    async findAllUsersThatLikedTuit(tid: string): Promise<Like[]> {
        return await LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }
    async findAllTuitsLikedByUser(uid: string): Promise<Like[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }
    async userUnlikesTuit(tid: string, uid: string): Promise<any> {
        return await LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
    async userLikesTuit(tid: string, uid: string): Promise<Like> {
        return await LikeModel.create({tuit: tid, likedBy: uid});
    }
}