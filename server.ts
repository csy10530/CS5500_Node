import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";

import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://SiyuanChen:CS5500Sp22@cs5500.t59xq.mongodb.net/tuiter?retryWrites=true&w=majority');

app.get('/', (req:Request, res:Response) => res.send('Welcome!'));
app.get('/hello', (req: Request, res: Response) => res.send('Hello World!'));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);
