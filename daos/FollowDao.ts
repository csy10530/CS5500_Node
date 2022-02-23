import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    async userFollowsAnotherUser(uid1: string, uid2: string): Promise<Follow> {
        return await FollowModel.create({following: uid2, followedBy: uid1});
    }

    async userUnfollowsAnotherUser(uid1: string, uid2: string): Promise<any> {
        return await FollowModel.deleteOne({following: uid2, followedBy: uid1});
    }

    async findFollowingUsers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({followedBy: uid}).populate("following").exec();
    }

    async findFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({following: uid}).populate("followedBy").exec();
    }

    async userUnfollowsAllUsers(uid: string): Promise<any> {
        return await FollowModel.deleteMany({followedBy: uid});
    }

    async userDeletesAllFollowers(uid: string): Promise<any> {
        return await FollowModel.deleteMany({following: uid});
    }
}
