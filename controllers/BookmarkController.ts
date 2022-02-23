import Bookmark from "../models/bookmarks/Bookmark";
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";


export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/users/:uid/bookmarks', BookmarkController.bookmarkController.findBookmarkedTuits);
            app.delete('/user/:uid/bookmarks', BookmarkController.bookmarkController.userUnbookmarksAllTuits);
            app.get('/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findUsersThatBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));


    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    findBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findBookmarkedTuits(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then(status => res.json(status));

    findUsersThatBookmarkedTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.findUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    }

}
