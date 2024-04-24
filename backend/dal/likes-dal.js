import { execute, executeWithParameters } from './connection-wrapper.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';
import calculateCurrentTime from '../utils/calculate-time.js';


const addLike = async (like, connection) => {
    let sql = "insert into likes (user_id, recipe_id) values (?, ?)";
    let parameters = [like.userId, like.recipeId];
    try {
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError(ErrorTypes.DOUBLE_LIKE, "Like already exists", 400, error.code, true);
        }
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add like to database", 500, false);
    }
}


const getAllLikes = async () => {
    let sql = "select user_id, recipe_id from likes";
    try {
        let likes = await execute(sql);
        return likes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get likes from database", 500, false);
    }
}
const getAllLikesByRecipeId = async (recipeId) => {
    let sql = "select user_id, recipe_id from likes where recipe_id = ?";
    let parameters = [recipeId];
    try {
        let likes = await executeWithParameters(sql, parameters);
        return likes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get likes from database", 500, false);
    }
}

const getAllLikesByUserId = async (userId) => {
    let sql = "select user_id as userId, recipe_id recipeId from likes where user_id = ?";
    let parameters = [userId];
    try {
        let likes = await executeWithParameters(sql, parameters);
        return likes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get likes from database", 500, false);
    }
}

const deleteLike = async (userId, recipeId, connection) => {
    let sql = "delete from likes where user_id = ? and recipe_id = ?";
    let parameters = [userId, recipeId];
    try {
        let deletedLikes = await executeWithParameters(sql, parameters, connection);
        if (deletedLikes.affectedRows === 0) {
            throw new AppError(ErrorTypes.DB_ERROR, "failed to delete any likes", 404, true);
        }
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete like from database", 500, false);
    }
}

const deleteLikesByRecipeId = async (recipeId, connection = null) => {
    let sql = "delete from likes where recipe_id = ?";
    let parameters = [recipeId];
    try {
        let deletedItems = await executeWithParameters(sql, parameters, connection);
        if (deletedItems.affectedRows === 0) {
            throw new AppError(ErrorTypes.DB_ERROR, "failed to delete any likes", 404, true);
        }
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(DB_ERROR, "Failed to delete likes from database", 500, false);
    }
}

const toggleLikeOff = async (recipeId, userId) => {
    let sql = "delete from likes where user_id = ? and recipe_id = ?";
    let parameters = [userId, recipeId];
    try {
        let deletedLikes = await executeWithParameters(sql, parameters);
        if (deletedLikes.affectedRows === 0) {
            throw new AppError(ErrorTypes.DB_ERROR, "failed to delete any likes", 404, true);
        }
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete like from database", 500, false);
    }
}


export {
    addLike,
    getAllLikes,
    getAllLikesByRecipeId,
    getAllLikesByUserId,
    deleteLike,
    deleteLikesByRecipeId,
    toggleLikeOff

};
