import {
    getIngredient as getIngredientDal,
    getAllIngredients as getAllIngredientsDal,
    addIngredient as addIngredientDal,
    updateIngredient as updateIngredientDal,
    deleteIngredient as deleteIngredientDal,
    getIngredientsByRecipeId as getIngredientsByRecipeIdDal,
    checkIfIngredientsExist as checkIfIngredientsExistDal,
    addIngredientsFromRecipe as addIngredientsFromRecipeDal
} from '../dal/ingredients-dal.js';
import { validateIngredients } from './validator.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';

const addIngredient = async (ingredient) => {
    const { error, value } = validateIngredients(ingredient);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    await addIngredient(value);
};

const getAllIngredients = async () => {
    const ingredients = await getAllIngredientsDal();
    if (!ingredients) {
        throw new AppError(ErrorTypes.NO_INGREDIENTS_FOUND, "no ingredients found", 404, "no ingredients found", true);
    }
    return ingredients;
};

const getIngredient = async (ingredientId) => {
    const ingredient = await getIngredientDal(ingredientId);
    if (!ingredient) {
        throw new AppError(ErrorTypes.NO_INGREDIENTS_FOUND, "ingredient not found", 404, "ingredient not found", true);
    }
    return ingredient;
};

const updateIngredient = async (ingredient) => {
    const { error, value } = validateIngredients(ingredient);
    if (error) {
        throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
    }
    await updateIngredientDal(value);
};

const deleteIngredient = async (ingredientId) => {
    await deleteIngredient(ingredientId);
};

const getIngredientsByRecipeId = async (recipeId) => {
    const ingredients = await getIngredientsByRecipeIdDal(recipeId);
    if (!ingredients) {
        return;
    }
    return ingredients;
};

const getAllIngredientsForRecipes = async (recipeIds) => {
    let ingredients = [];
    recipeIds.forEach(id => {
        let receivedIngredients = getIngredientsByRecipeIdDal(id);
        ingredients.push(receivedIngredients);
    });
    return ingredients;
};


const addIngredientsFromRecipe = async (ingredients, connection) => {
    let values = [];
    ingredients.forEach(ingredient => {
        const { error, value } = validateIngredients(ingredient);
        values.push(value);
        if (error) {
            throw new AppError(ErrorTypes.VALIDATION_ERROR, error.message, 400, error.code, true);
        }
    });
    try {
        let existingIngredients = await checkIfIngredientsExistDal(values, connection);
        const existingIngredientNames = existingIngredients.map(ingredient => ingredient.name);
        const newIngredients = values.filter(ingredient =>
            !existingIngredientNames.map(name => name.toLowerCase()).includes(ingredient.name.toLowerCase())
        );

        if (newIngredients.length > 0) {
            let addedIngredients = await addIngredientsFromRecipeDal(newIngredients, connection);
            existingIngredients.push(...addedIngredients);
        }
        return existingIngredients;
    } catch (error) {
        console.log(error.message)
        throw new AppError(ErrorTypes.INVALID_INGREDIENT, error.message, 400, true);
    }
};


export {
    addIngredient,
    getAllIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient,
    addIngredientsFromRecipe,
    getIngredientsByRecipeId,
    getAllIngredientsForRecipes
};