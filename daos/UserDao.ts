import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * Implements the DAO of users
 * @implements {UserDaoI} UserDaoI interface
 * @property {UserDao} userDao single instance of UserDaoI
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }

    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
}
