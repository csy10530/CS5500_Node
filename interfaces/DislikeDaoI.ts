import Dislike from "../models/dislikes/Dislike";

export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;

    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;

    userDislikesTuit(tid: string, uid: string): Promise<Dislike>;

    userUndislikesTuit(tid: string, uid: string): Promise<any>;

    countDislikesForTuit(tid: string): Promise<any>;
}
