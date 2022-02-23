import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findBookmarkedTuits(req: Request, res: Response): void;
    userUnbookmarksAllTuits(req: Request, res: Response): void;
    findUsersThatBookmarkedTuit(req: Request, res: Response): void;
}
