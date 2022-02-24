/**
 * @file Implements the Bookmark DAO using the BookmarkModel and mongoose
 * to integrate with MongoDb
 */
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

/**
 * @class BookmarkDao Implements the DAO managing data storage of bookmarks
 * @property {BookmarkDao} bookmarkDao single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns BookmarkDao singleton instance
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts a bookmark instance into the database
     * @param uid user's primary key
     * @param tid tuit's primary key
     */
    async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {
        return await BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    }

    /**
     * Removes a bookmark instance from the database
     * @param uid user's primary key
     * @param tid tuit's primary key
     */
    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
    }

    /**
     * Retrieve all bookmark documents by user from the database
     * @param uid user's primary key
     */
    async findBookmarkedTuits(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();
    }

    /**
     * Removes all bookmark documents by user from the database
     * @param uid user's primary key
     */
    async userUnbookmarksAllTuits(uid: string): Promise<any> {
        return await BookmarkModel.deleteMany({bookmarkedBy: uid});
    }


    /**
     * Retrieve all bookmarked tuits from the database
     * @param tid tuit's primary key
     */
    async findUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({tuit: tid}).populate("bookmarkedBy").exec();
    }
}
