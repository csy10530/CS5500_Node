/**
 * @file Implements an Express HTTP server using Node.
 * Declares RESTful Web Services enabling CRUD operations on the following resources:
 * <ul>
 *     <li>tuits</li>
 *     <li>users</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";

import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://SiyuanChen:CS5500Sp22@cs5500.t59xq.mongodb.net/tuiter?retryWrites=true&w=majority');

app.get('/', (req:Request, res:Response) => res.send('Welcome!'));
app.get('/hello', (req: Request, res: Response) => res.send('Hello World!'));

// create RESTful Web service controllers
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

// Start a server that listens at port 4000 or an available environment port
const PORT = 4000;
app.listen(process.env.PORT || PORT);
