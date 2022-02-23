import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findBookmarkedTuits(uid: string): Promise<Bookmark[]>;
    userUnbookmarksAllTuits(uid: string): Promise<any>;
    findUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;
}
