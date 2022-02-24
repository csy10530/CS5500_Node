/**
 * @file Declares the interface for the Message controller
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendsMessage(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    deleteOneMessage(req: Request, res: Response): void;
    deleteAllSentMessage(req: Request, res: Response): void;
    deleteAllReceivedMessage(req: Request, res: Response): void;
}
