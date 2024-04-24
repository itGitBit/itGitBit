import {
    addComment as addCommentDal,
    getAllComments as getAllCommentsDal,
    getAllCommentsByRecipeId as getAllCommentsByRecipeIdDal,
    getAllCommentsByUserId as getAllCommentsByUserIdDal,
    getComment as getCommentDal,
    updateComment as updateCommentDal,
    deleteComment as deleteCommentDal,

} from '../dal/comments-dal.js';
import {validateComments} from './validator.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';
import { checkIfRecipeExists } from './recipes-logic.js';
import { checkIfUserExists } from './users-logic.js';

const addComment = async (comment) => {
    const { error, value } = validateComments(comment);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    let validateRecipe = await checkIfRecipeExists(value.recipeId);
    if (!validateRecipe) {
        throw new AppError(ErrorTypes.NO_RECIPES_FOUND, "recipe not found", 404, true);
    }
    let isUserValid = await checkIfUserExists(value.userId);
    if (!isUserValid) {
        throw new AppError(ErrorTypes.INVALID_USER, "user not found", 404, true)
    }
    await addCommentDal(value);
};

const getAllComments = async () => {
    const comments = await getAllCommentsDal();
    if (!comments) {
        throw new AppError(ErrorTypes.NO_COMMENTS_FOUND, "no comments found", 404, "no comments found", true);
    }
    return comments;
};

const getAllCommentsByRecipeId = async (recipeId) => {
    const comments = await getAllCommentsByRecipeIdDal(recipeId);
    if (!comments) {
        throw new AppError(ErrorTypes.NO_COMMENTS_FOUND, "no comments found", 404, "no comments found", true);
    }
    return comments;
};

const getAllCommentsByUserId = async (userId) => {
    const comments = await getAllCommentsByUserIdDal(userId);
    if (!comments) {
        throw new AppError(ErrorTypes.NO_COMMENTS_FOUND, "no comments found", 404, "no comments found", true);
    }
    return comments;
};


const getComment = async (commentId) => {
    const comment = await getCommentDal(commentId);
    if (!comment) {
        throw new AppError(ErrorTypes.NO_COMMENTS_FOUND, "comment not found", 404, "comment not found", true);
    }
    return comment;
};

const updateComment = async (comment) => {
    const { error, value } = validateComments(comment);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    await updateCommentDal(value);
};

const deleteComment = async (commentId) => {
    await deleteCommentDal(commentId);
};

export {
    addComment,
    getAllComments,
    getAllCommentsByRecipeId,
    getAllCommentsByUserId,
    getComment,
    updateComment,
    deleteComment
};