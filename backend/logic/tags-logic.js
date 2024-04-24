import { validateTags } from "./validator.js";
import { addTag as addTagDal, getTag as getTagDal, getAllTags as getAllTagsDal, getTagsByRecipeId as getTagsByRecipeIdDal, updateTag as updateTagDal, deleteTag as deleteTagDal, checkIfTagsExist, addTagsFromRecipe as addTagsFromRecipeDal } from "../dal/tags-dal.js";
import AppError from "../error/AppError.js";
import ErrorTypes from "../consts/ErrorTypes.js";


const addTag = async (tag) => {
    const { error, value } = validateTags(tag);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    await addTagDal(value);
};

const getAllTags = async () => {
    const tags = await getAllTagsDal();
    if (!tags) {
        throw new AppError(ErrorTypes.NO_TAGS_FOUND, "no tags found", 404, "no tags found", true);
    }
    return tags;
};

const getTag = async (tagId) => {
    const tag = await getTagDal(tagId);
    if (!tag) {
        throw new AppError(ErrorTypes.NO_TAGS_FOUND, "no tags found", 404, "no tags found", true);
    }
    return tag;
}

const getTagsByRecipeId = async (recipeId) => {
    const tags = await getTagsByRecipeIdDal(recipeId);
    if (!tags) {
        return;
    }
    return tags;
}

const getAllTagsForRecipes = async (recipeIds) => {
    let tags = [];
    recipeIds.forEach(id => {
        let receivedTags = getTagsByRecipeId(id);
        tags.push(receivedTags);
    });
    return tags;
}


const updateTag = async (tag) => {
    const { error, value } = validateTags(tag);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    await updateTagDal(tag);
};

const deleteTag = async (tagId) => {
    await deleteTagDal(tagId);
};

const addTagsFromRecipe = async (tags, connection) => {
    let values = [];
    tags.forEach(tag => {
        const { error, value } = validateTags(tag);
        values.push(value);
        if (error) {
            throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
        }
    });
    const existingTags = await checkIfTagsExist(values, connection);
    const existingTagsNames = existingTags.map(tag => tag.name);
    const newTagsList = values.filter(value =>
        !existingTagsNames.map(name => name.toLowerCase()).includes(value.name.toLowerCase())
    );
    if (newTagsList.length > 0) {
        let addedTags = await addTagsFromRecipeDal(newTagsList, connection);
        existingTags.push(...addedTags);
    }
    return existingTags;
}

export {
    addTag,
    getAllTags,
    getTag,
    getTagsByRecipeId,
    updateTag,
    deleteTag,
    addTagsFromRecipe,
    getAllTagsForRecipes
};