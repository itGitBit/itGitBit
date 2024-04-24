import { config } from 'dotenv';
config();
import { validateLogin, validateSignup, validateUserUpdate, validateNewPassword } from './validator.js';
import { getUserByEmail, isUserExist, addUser, deleteUser as deleteUserDal, updateUser as updateUserDal, getUser as getUserDal, getAllUsers as getAllUsersDal, getUserPassword, updateUserWithPasswordDal } from "../dal/users-dal.js";
import bcrypt from "bcrypt";
import AppError from "../error/AppError.js";
import errorType from "../consts/ErrorTypes.js";
import jwt from 'jsonwebtoken';

const login = async (userLoginDetails) => {
    const { error, value } = validateLogin(userLoginDetails);
    if (error) { throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true); }
    const user = await getUserByEmail(value.email);
    if (!user) {
        throw new AppError(errorType.NO_USERS_FOUND, "user not found", 404, "user not found", true);
    }
    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (!isPasswordMatch) {
        console.log("invalid password");
        throw new AppError(errorType.VALIDATION_ERROR, "invalid password", 401, "invalid password", true);
    }
    const accessToken = jwt.sign({ username: user.username, type: user.type, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: user.username, type: user.type, id: user.id }, process.env.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
}


const register = async (user) => {
    if (!user.type) {
        user.type = 'user';
    }
    const { error, value } = validateSignup(user);
    if (error) { throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true); }
    await isUserExist(value.email);
    const hashedPassword = await bcrypt.hash(value.password, 10);
    user.password = hashedPassword;
    user.active = 1;
    await addUser(user);
};


const getUser = async (userId) => {
    const user = await getUserDal(userId);
    if (!user) {
        throw new AppError(errorType.NO_USERS_FOUND, "user not found", 404, "user not found", true);
    }
    return user;
};

const deleteUser = async (userId) => {
    await deleteUserDal(userId);
};

const updateUser = async (user) => {
    const { error, value } = validateUserUpdate(user);
    if (error) { throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true); }
    const newUser = await updateUserDal(value);
    return newUser;
};

const updatePassword = async (userId, oldPassword, newPassword) => {
    const user = await getUserPassword(userId);
    if (!user) {
        throw new AppError(errorType.NO_USERS_FOUND, "user not found", 404, "user not found", true);
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new AppError(errorType.VALIDATION_ERROR, "invalid password", 401, "invalid password", true);
    }
    const { error, value } = validateNewPassword({ password: newPassword });
    if (error) {
        throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.id = userId;
    await updateUserWithPasswordDal(user);
    return "password updated successfully";
}


const checkIfUserExists = async (userId) => {
    const user = await getUserDal(userId);
    if (!user) {
        return false;
    }
    return true;
}

const getAllUsers = async () => {
    const users = await getAllUsersDal()
    if (!users) {
        throw new AppError(errorType.NO_USERS_FOUND, "no users found", 400, false);
    }
}




export {
    register,
    getUser,
    login,
    checkIfUserExists,
    updateUser,
    deleteUser,
    getAllUsers,
    updatePassword
};
