/**
 * @file Implements the Tuit DAO using the TuitModel and mongoose
 * to integrate with MongoDb
 */
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements the DAO managing data storage of tuits
 * @property {TuitDao} followDao single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns TuitDao singleton instance
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Inserts a tuit document into the database
     * @param tuit tuit body
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Inserts a tuit document by user into the database
     * @param uid user's primary key
     * @param tuit tuit body
     */
    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Removes a specific tuit document from the database
     * @param tid tuit's primary key
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    /**
     * Retrieves all tuits from the database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Retrieves a specific tuit by its id from the database
     * @param tid tuit's primary key
     */
    async findTuitById(tid: string): Promise<Tuit> {
        return await TuitModel.findById({_id: tid}).populate("postedBy").exec();
    }

    /**
     * Retrieves all tuit documents posted by a specific user from the database
     * @param uid user's primary key
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    /**
     * Updates a specific tuit document in the database
     * @param tid tuit's primary key
     * @param tuit tuit body
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
}
