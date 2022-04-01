import UserDao from "../daos/UserDao";

const userDao: UserDao = UserDao.getInstance();

export const login = async (u: string, p: string) =>
    userDao.findUserByCredentials(u, p)
        .then(user => {
            if (user) {
                return user;
            } else {
                throw "Unknown user";
            }
        }).then(user => user).catch(e => e);

export const register = async (u: string, p: string, e: string) =>
    userDao.findUserByUsername(u)
        .then(async user => {
            if (user) {
                throw "User already exists";
            } else {
                return await userDao.createUser({username: u, password: p, email: e});
            }
        }).then(newUser => newUser).catch(e => e);
