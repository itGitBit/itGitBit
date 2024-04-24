import { validateLikes } from "./validator.js";
import {deleteLike as deleteLikeDal, addLike as addLikeDal, getAllLikes as getAllLikesDal, getAllLikesByRecipeId as getAllLikesByRecipeIdDal, getAllLikesByUserId as getAllLikesByUserIdDal, deleteLikesByRecipeId } from "../dal/likes-dal.js";
import AppError from "../error/AppError.js";
import errorType from "../consts/ErrorTypes.js";
import { updateLikeCounter } from "./recipes-logic.js";
// import {commitTransaction, beginTransaction, rollbackTransaction} from '../dal/connection-wrapper.js';

//use import instead of require


//With transaction
////overkill. preferred to count the like per recipe everytime a like is added.

// const addLike = async (like) => {
//     let connection;
//     const {error, value} = validateLikes(like);
//     if (error) {
//         throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true);
//     }
//     try {
//         connection = await beginTransaction();
//         await likesDal.addLike(value, connection);
//         await updateLikeCounter(value.recipeId, +1, connection);
//         await commitTransaction(connection);
//         return "like added";
//     } catch (error) {
//         if (error.errorType === errorType.DOUBLE_LIKE) {
//             try {
//                 await toggleLikeOff(value.userId, value.recipeId, -1, connection);
//                 await commitTransaction(connection);
//                 return "like removed"; 
//             } catch (innerError) {
//                 await rollbackTransaction(connection);
//             }
//         } else if (connection) {
//             await rollbackTransaction(connection);
//         }
//         throw new AppError(errorType.DB_ERROR, "Failed to add like to database", 500, false);
//     }
// };


const addLike = async (like) => {
    const { error, value } = validateLikes(like);
    if (error) {
        throw new AppError(errorType.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    try {
        await addLikeDal(value);
        await updateLikeCounter(value.recipeId);
        return "like added";
    }
    catch (error) {
        if (error.errorType === errorType.DOUBLE_LIKE) {
            try {
                await toggleLikeOff(value.userId, value.recipeId);
                return "like removed";
            }
            catch (innerError) {
                console.log(error.message)
                throw new AppError(errorType.DB_ERROR, "Failed to add like to database", 500, false);
            }
        }
        else {
            throw new AppError(errorType.DB_ERROR, "Failed to add like to database", 500, false);
        }
    }
}

const getAllLikes = async () => {
    const likes = await getAllLikesDal();
    if (!likes) {
        throw new AppError(errorType.NO_LIKES_FOUND, "no likes found", 404, "no likes found", true);
    }
    return likes;
};

const getAllLikesByRecipeId = async (recipeId) => {
    const likes = await getAllLikesByRecipeIdDal(recipeId);
    if (!likes) {
        return;
    }
    return likes;
}
const getAllLikesByUserId = async (userId) => {
    const likes = await getAllLikesByUserIdDal(userId);
    if (!likes) {
        return;
    }
    return likes;
}




const deleteLike = async (userId, recipeId) => {
    try {
        await deleteLikeDal(userId, recipeId);
        await updateLikeCounter(recipeId);

    }
    catch (error) {
        throw new AppError(errorType.DB_ERROR, error.message, 500, true);
    }

};

const toggleLikeOff = async (userId, recipeId) => {
    try {
        await deleteLikeDal(userId, recipeId);
        await updateLikeCounter(recipeId);
    } catch (error) {
        throw new AppError(errorType.DB_ERROR, error.message, 500, false)
    }
}


const deleteLikesByRecipeIdWithConnection = async (recipeId, connection) => {
    await deleteLikesByRecipeId(recipeId, connection);
};


export {
    addLike,
    getAllLikes,
    getAllLikesByRecipeId,
    deleteLike,
    getAllLikesByUserId,
    deleteLikesByRecipeIdWithConnection
};