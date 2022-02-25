/**
 * @file RESTful API for Bookmark controller
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful API for Bookmark Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve user's bookmarked tuits</li>
 *     <li>GET /tuits/:tid/bookmarks to retrieve users who bookmarked the tuit</li>
 *     <li>POST /users/:uid/bookmarks/:tid to bookmark a tuit</li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to unbookmark a tuit</li>
 *     <li>DELETE /users/:uid/bookmarks to unbookmark all tuits</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO that implements the bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller that implements the RESTful API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return BookmarkController An instance of bookmark controller
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/users/:uid/bookmarks', BookmarkController.bookmarkController.findBookmarkedTuits);
            app.delete('/users/:uid/bookmarks', BookmarkController.bookmarkController.userUnbookmarksAllTuits);
            app.get('/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findUsersThatBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Inserts a bookmark instance into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));

    /**
     * Removes a bookmark instance from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * Retrieve all bookmark documents by user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findBookmarkedTuits(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes all bookmark documents by user from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then(status => res.json(status));

    /**
     * Retrieve all bookmarked tuits from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findUsersThatBookmarkedTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.findUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    }

}
