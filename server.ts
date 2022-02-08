import express, {Request, Response} from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://SiyuanChen:CS5500Sp22@cs5500.t59xq.mongodb.net/tuiter?retryWrites=true&w=majority');

app.get('/', (req:Request, res:Response) => res.send('Welcome!'));
app.get('/hello', (req: Request, res: Response) => res.send('Hello World!'));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
