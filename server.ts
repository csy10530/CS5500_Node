/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import AuthenticationController from "./controllers/AuthenticationController";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import GroupController from "./controllers/GroupController";
import SessionController from "./controllers/SessionController";
const cors = require("cors");
const session = require("express-session");

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "SiyuanChen"//process.env.DB_USERNAME;
const DB_PASSWORD = "CS5500Sp22"//process.env.DB_PASSWORD;
const HOST = "cs5500.t59xq.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.CORS_ORIGIN]
}));

let sess = {
    secret: "session",//process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "PRODUCTION" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "PRODUCTION"
    }
}

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session(sess))
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
SessionController(app);
AuthenticationController(app);
GroupController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
