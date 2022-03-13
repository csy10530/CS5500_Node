/**
 * @file RESTful API for User controller
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import User from "../models/users/User";

/**
 * @class UserController Implements RESTful API for User Controller
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all users</li>
 *     <li>GET /users/:uid to retrieve a specific user</li>
 *     <li>DELETE /users/:uid to delete a user by id</li>
 *     <li>POST /users to create a new user/li>
 *     <li>PUT /users/:uid to update a user by id</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO that implements the tuit CRUD operations
 * @property {UserController} userController Singleton controller that implements the RESTful API
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    /**
     * Creates a singleton controller instance
     * @param {Express} app An Express instance to declare the API
     * @return LikeController An instance of user controller
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:uid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:uid', UserController.userController.deleteUser);
            app.put('/users/:uid', UserController.userController.updateUser);

            //for test purpose
            app.post('/register', UserController.userController.register);
            app.post('/login', UserController.userController.login);
            app.get('/users/username/:username/delete', UserController.userController.deleteUserByUsername);
        }
        return UserController.userController;
    }

    private constructor() {}

    /**
     * Inserts a user document into the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Delete a specific user document from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    /**
     * Retrieves all users in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Retrieves a specific user document from the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then(user => res.json(user));

    /**
     * Updates a specific user document in the database
     * @param req represents a request from the client
     * @param res represents a response to the client
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));

    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => res.json(user));

    login = (req: Request, res: Response) =>
        UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
            .then(user => res.json(user));

    deleteUserByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUserByUsername(req.params.username)
            .then(status => res.json(status));
}
