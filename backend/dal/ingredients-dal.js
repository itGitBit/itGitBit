import { execute, executeWithParameters } from './connection-wrapper.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';
import calculateCurrentTime from '../utils/calculate-time.js';



const addIngredient = async (ingredient) => {
    let sql = "insert into ingredients (name) values (?)";
    let parameters = [ingredient.name];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError(ErrorTypes.VALIDATION_ERROR, "Ingredient already exists", 400, error.code, true);
        }
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add ingredient to database", 500, false);
    }
}

const getAllIngredients = async () => {
    let sql = "select id,name from ingredients";
    try {
        let ingredients = await execute(sql);
        return ingredients;
    } catch (error) {
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get ingredients from database", 500, false);
    }
}
const getIngredient = async (ingredientId) => {
    let sql = "select id, name from ingredients where id = ?";
    let parameters = [ingredientId];
    try {
        let ingredient = await executeWithParameters(sql, parameters);
        return ingredient;
    } catch (error) {
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get ingredient from database", 500, false);
    }
}

const getIngredientsByRecipeId = async (recipeId) => {
    let sql = `SELECT i.id, i.name , ri.recipe_id
    FROM ingredients i 
    JOIN recipe_ingredients ri ON ri.ingredient_id = i.id where ri.recipe_id=? ;`;

    let parameters = [recipeId];
    try {
        let ingredients = await executeWithParameters(sql, parameters);
        return ingredients;
    } catch (error) {
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get ingredients from database", 500, false);
    }
}



const updateIngredient = async (ingredient) => {
    let sql = "update ingredients set name = ? where id = ?";
    let parameters = [ingredient.name, ingredient.id];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to update ingredient in database", 500, false);
    }
}
const deleteIngredient = async (ingredientId) => {
    let sql = "delete from ingredients where id = ?";
    let parameters = [ingredientId];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete ingredient from database", 500, false);
    }
}

const checkIfIngredientsExist = async (ingredients, connection) => {

    let ingredientsNames = ingredients.map(ingredient => ingredient.name);
    const placeholders = ingredientsNames.map(() => '?').join(',');
    const sql = `SELECT id, name FROM ingredients WHERE name IN (${placeholders})`;
    const parameters = ingredients.map(ingredient => ingredient.name);
    try {
        const rows = await executeWithParameters(sql, parameters, connection);
        let existingIngredients = rows.map(row => ({ id: row.id, name: row.name }));
        return existingIngredients;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - ingredientsDal.checkIfIngredientExist -  ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get ingredients from database", 500, false);
    }
};





async function addIngredientsFromRecipe(ingredients, connection) {
    let ingredientsReturning = [];
    for (const ingredient of ingredients) {
        const sql = "INSERT INTO ingredients (name) VALUES (?)";
        const parameters = [ingredient.name];
        try {
            const result = await executeWithParameters(sql, parameters, connection);
                ingredientsReturning.push({ id: result.insertId, name: ingredient.name });
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new AppError(ErrorTypes.VALIDATION_ERROR, "Ingredient already exists", 400, error.code, true);
            }
            console.log(`${calculateCurrentTime()} - ${error.message}`);
            throw new Error("Failed to add ingredient to database", 500, false);
        }
    }
    return ingredientsReturning;
}


export {
    addIngredient,
    getAllIngredients,
    getIngredient,
    getIngredientsByRecipeId,
    updateIngredient,
    deleteIngredient,
    checkIfIngredientsExist,
    addIngredientsFromRecipe
};