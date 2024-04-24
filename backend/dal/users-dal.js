import ErrorTypes from "../consts/ErrorTypes.js";
import AppError from "../error/AppError.js";
import { execute, executeWithParameters } from "./connection-wrapper.js";
import calculateCurrentTime from '../utils/calculate-time.js';


const addUser = async (user) => {
    let sql = " INSERT INTO users (username, password, email, type, profile_picture, active) VALUES (?, ?, ?, ?,?,?)"
    let parameters = [user.username, user.password, user.email, user.type, user.profilePicture, user.active];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError(ErrorTypes.VALIDATION_ERROR, "User already exists", 400, error.code, true);
        }
        console.log(error.message);
        throw new AppError(ErrorTypes.DB_ERROR, `${calculateCurrentTime()} ${error.message}`, 500, false);
    }
}

const getUserPassword = async (userId) => {
    let sql = "select username, password, profile_picture as profilePicture, email from users where id=?"
    let parameters = [userId];
    let user;
    try {
        user = await executeWithParameters(sql, parameters);
        if (!user) {

            throw new AppError(ErrorTypes.INVALID_USER, `${calculateCurrentTime()} ${error.message}`, 404, true);
        }

    }
    catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        console.log(error.message);
        throw new AppError(ErrorTypes.DB_ERROR, `${calculateCurrentTime()} ${error.message}`, 500, false);
    }
    return user[0];
}

const getUser = async (userId) => {
    let sql = "select username, profile_picture as profilePicture, email from users where id=?"
    let parameters = [userId];
    let user;
    try {
        user = await executeWithParameters(sql, parameters);
        if (!user) {

            throw new AppError(ErrorTypes.INVALID_USER, `${calculateCurrentTime()} ${error.message}`, 404, true);
        }

    }
    catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        console.log(error.message);
        throw new AppError(ErrorTypes.DB_ERROR, `${calculateCurrentTime()} ${error.message}`, 500, false);
    }
    return user[0];
}

const getAllUsers = async () => {
    let sql = "select name, email, type, profile_picture from users"
    try {
        let userList = await connection.execute(sql);
        if (!userList) {
            throw new AppError(ErrorTypes.INVALID_USER, `${calculateCurrentTime()} ${error.message}`, 404, true);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(`${calculateCurrentTime()} - usersDal.getAllUsers ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get users from database", 500, false);
    }
    return userList;
}

const isUserExist = async (email) => {
    let sql = "select email from users where email = ?"
    let parameters = [email];
    try {
        let user = await executeWithParameters(sql, parameters);
        if (user[0] != null) {
            console.log("user already exists", user);
            throw new AppError(ErrorTypes.INVALID_USER, "user already exists", 404, true);
        }
    }
    catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(error.message);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get user from database", 500, false);

    }
}


const getUserByEmail = async (email) => {
    const sql = "SELECT id, username, password, email, type, profile_picture FROM users WHERE email = ?";
    let parameters = [email];
    try {
        let users = await executeWithParameters(sql, parameters);
        let user = users[0];
        if (!user) {
            throw new AppError(ErrorTypes.INVALID_USER, "user not found", 404, false);
        }
        return user;
    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get user from database", 500, false);
    }
}

const deleteUser = async (userId) => {
    const sql = ' delete from users where id = ?';
    let parameters = [userId];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - usersDal.deleteUser - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "failed to delete user", 500, false)
    }
}
const updateUser = async (user) => {
    let sql = 'update users set username=?, email=?, profile_picture=? where id=?';
    let parameters = [user.username, user.email, user.profilePicture, user.id];
    try {
        const updateDetails = await executeWithParameters(sql, parameters);
        const newUser = await getUser(user.id);
        return newUser;


    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            console.log(`${calculateCurrentTime()} - usersDal.updateUser - ${error.message}`)
            throw new AppError(ErrorTypes.VALIDATION_ERROR, "User already exists", 400, error.code, true);
            return;
        }
        console.log(`${calculateCurrentTime()} - usersDal.updateUser - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, `failed to update user`, 500, false)
    }
}


const updateUserWithPasswordDal = async (user) => {
    let sql = 'update users set username=?, password=?, email=?, profile_picture=? where id=?';
    let parameters = [user.username, user.password, user.email, user.profilePicture, user.id];
    try {
        const updateDetails = await executeWithParameters(sql, parameters);
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            console.log(`${calculateCurrentTime()} - usersDal.updateUser - ${error.message}`)
            throw new AppError(ErrorTypes.VALIDATION_ERROR, "User already exists", 400, error.code, true);
            return;
        }
        console.log(`${calculateCurrentTime()} - usersDal.updateUser - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, `failed to update user`, 500, false)
    }
}



export {
    addUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    isUserExist,
    deleteUser,
    updateUser,
    getUserPassword,
    updateUserWithPasswordDal
}