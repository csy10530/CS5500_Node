import DislikeDaoI from "../interfaces/DislikeDaoI";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    async findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]> {
        return await DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    async findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]> {
        return await DislikeModel.find({dislikedBy: uid}).populate({path: "tuit", populate: {path: "postedBy"}}).exec();
    }

    async userDislikesTuit(tid: string, uid: string): Promise<Dislike> {
        return await DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    async userUndislikesTuit(tid: string, uid: string): Promise<any> {
        return await DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    async countDislikesForTuit(tid: string): Promise<any> {
        return await DislikeModel.count({tuit: tid});
    }

    async findUserDislikesTuit(uid: string, tid: string): Promise<any> {
        return await DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }
}
