/**
 * @file Implements the User DAO using the UserModel and mongoose
 * to integrate with MongoDb
 */
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements the DAO managing data storage of users
 * @property {UserDao} followDao single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns UserDao singleton instance
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    /**
     * Retrieves all users in the database
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * Retrieves a specific user document from the database
     * @param uid user's primary key
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    /**
     * Inserts a user document into the database
     * @param user user body
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Update a specific user document in the database
     * @param uid user's primary key
     * @param user user body
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }

    /**
     * Delete a specific user document from the database
     * @param uid user's primary key
     */
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }

    async findUserByUsername(username: string): Promise<any> {
        return await UserModel.findOne({username});
    }

    async findUserByCredentials(username: string, password: string): Promise<any> {
        return await UserModel.findOne({username: username, password: password});
    }

    async deleteUserByUsername(username: string): Promise<any> {
        return await UserModel.deleteMany({username: username});
    }
}
