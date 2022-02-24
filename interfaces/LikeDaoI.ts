/**
 * @file Declares the interface of Like's data access object methods
 */
import Like from "../models/likes/Like";

export default interface LikeDaoI {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
    userLikesTuit(tid: string, uid: string): Promise<Like>;
}
