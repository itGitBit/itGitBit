import { execute, executeWithParameters } from './connection-wrapper.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';
import calculateCurrentTime from '../utils/calculate-time.js';


const addTag = async (tag) => {
    let sql = "insert into tags (name) values (?)";
    let parameters = [tag.name];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {

            throw new AppError(ErrorTypes.VALIDATION_ERROR, "Tag already exists", 400, error.code, true);
        }
        console.log(`${calculateCurrentTime()} - tagsDal.addTag - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add tag to database", 500, false);
    }
}



const getAllTags = async () => {
    let sql = "select id, name from tags";
    try {
        let tags = await execute(sql);
        return tags;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.getAllTags - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get tags from database", 500, false);
    }
}

const getTag = async (tagId) => {
    let sql = "select id, name from tags where id = ?";
    let parameters = [tagId];
    try {
        let tag = await executeWithParameters(sql, parameters);
        return tag;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.getTag - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, error.message, 500, false);
    }
}

const updateTag = async (tag) => {
    let sql = "update tags set name = ? where id = ?";
    let parameters = [tag.name, tag.id];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.updateTag - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to update tag in database", 500, false);
    }
}

const deleteTag = async (tagId) => {
    let sql = "delete from tags where id = ?";
    let parameters = [tagId];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.deleteTag - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete tag from database", 500, false);
    }
}

const getTagsByRecipeId = async (recipeId) => {
    let sql = `SELECT t.id, t.name, rt.recipe_id
    FROM tags t 
    JOIN recipe_tags rt ON rt.tag_id = t.id where rt.recipe_id=? ;`;
    let parameters = [recipeId];
    try {
        let tags = await executeWithParameters(sql, parameters);
        return tags;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.getTagsByRecipeId - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get tags from database", 500, false);
    }
}

const checkIfTagsExist = async (tags, connection) => {
    const tagNames = tags.map(tag => tag.name);
    const placeholders = tagNames.map(() => '?').join(',');
    const sql = `SELECT id, name FROM tags WHERE name IN (${placeholders})`;
    try {
        let rows = await executeWithParameters(sql, tagNames, connection);
        const existingTags = rows.map(row => ({ name: row.name, id: row.id }));
        return existingTags;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - tagsDal.checkIfTagsExist - ${error.message}`)
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to check if tags exist in database", 500, false);
    }
};


const addTagsFromRecipe = async (tags, connection) => {
    let tagsReturning = [];
    for (const tag of tags) {
        const sql = "INSERT INTO tags (name) VALUES (?)";
        const parameters = [tag.name];
        try {
            const result = await executeWithParameters(sql, parameters);
            tagsReturning.push({ id: result.insertId, name: tag.name });
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new AppError(ErrorTypes.VALIDATION_ERROR, "tag already exists", 400, error.code, true);
            }
            console.log(`${calculateCurrentTime()} - tagsDal.addTagsFromRecipe - ${error.message}`)
            throw new Error("Failed to add tag to database", 500, false);
        }
    }
    return tagsReturning; // Return the collection of new ingredient IDs
}

export {
    addTag,
    getAllTags,
    getTag,
    updateTag,
    deleteTag,
    checkIfTagsExist,
    addTagsFromRecipe,
    getTagsByRecipeId
};