import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";


export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {
        return await BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    }

    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
    }

    async findBookmarkedTuits(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();
    }

    async findAllBookmarks(): Promise<Bookmark[]> {
        return await BookmarkModel.find().populate("tuit").populate("bookmarkedBy").exec();
    }

    async findUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({tuit: tid}).populate("bookmarkedBy").exec();
    }
}
