import { execute, executeWithParameters } from './connection-wrapper.js';
import AppError from '../error/AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';
import calculateCurrentTime from '../utils/calculate-time.js';



const addRecipe = async (recipe, connection) => {
    let sql = "insert into recipes (title, description, image, steps, user_id, likes_amount) values (?,?,?,?,?,?)";
    let parameters = [recipe.title, recipe.description, recipe.image, recipe.steps, recipe.userId, recipe.likesAmount];
    try {
        let response = await executeWithParameters(sql, parameters, connection);
        return response.insertId;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.AddRecipe ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add recipe to database", 500, false);
    }
}


const updateRecipeDal = async (recipe, connection) => {
    let sql = "update recipes set title=?, description=?, image=?, steps=?, user_id=?, likes_amount=?) where id=?";
    let parameters = [recipe.title, recipe.description, recipe.image, recipe.steps, recipe.userId, recipe.likesAmount, recipe.id];
    try {
        let response = await executeWithParameters(sql, parameters, connection);

    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.updateRecipe ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add recipe to database", 500, false);
    }
}


const getAllRecipes = async () => {
    let sql = `SELECT id, title, description, image, steps, user_id as userId, likes_amount as likesAmount FROM recipes;`;
    try {
        let recipes = await execute(sql);
        return recipes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getAllRecipes ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get all recipes from database", 500, false);
    }
}

const linkRecipeWithTags = async (recipeId, tagsId, connection) => {
    // Create placeholders for parameterized query
    const placeholders = tagsId.map(() => "(?, ?)").join(", ");
    const sql = `INSERT INTO recipe_tags (recipe_id, tag_id) VALUES ${placeholders}`;

    // Create a flat array of parameters, alternating between recipeId and each tagId
    const parameters = tagsId.flatMap(tagId => [recipeId, tagId]);

    try {
        // Ensure the transaction connection is used if provided
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.likeRecipesWithTags ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, error.message, 500, false);
    }
};

const linkRecipeWithIngredients = async (recipeId, ingredientsId, connection) => {
    const placeholders = ingredientsId.map(() => "(?, ?)").join(", ");
    const sql = `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ${placeholders}`;
    const parameters = ingredientsId.flatMap(ingredientId => [recipeId, ingredientId]);

    try {
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.linkRecipeWithIngredients ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to add ingredients to recipe in database", 500, false);
    }
};

const updateLikeCounter = async (recipeId, amountToUpdate) => {
    let sql = "update recipes set likes_amount = ? where id = ?";
    let parameters = [amountToUpdate, recipeId];
    try {
        await executeWithParameters(sql, parameters);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.updateLikeCounter ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, error.message, 500, false);
    }
}

const getAllRecipesIngredientByIngredientIds = async (ingredients) => {
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        throw new AppError(ErrorTypes.NO_RECIPES_FOUND, "No ingredients provided", 400, true);
    }
    const ingredientIds = ingredients.map(ingredient => ingredient.id);
    let placeholders = ingredientIds.map(() => '?').join(', ');
    let sql = `
        SELECT recipe_id as recipeId, COUNT(ingredient_id) as matchingIngredientsCount
        FROM recipe_ingredients
        WHERE ingredient_id IN (${placeholders})
        GROUP BY recipe_id
        ORDER BY COUNT(ingredient_id) DESC
    `;
    let parameters = ingredientIds;
    try {
        let recipes = await executeWithParameters(sql, parameters);
        if (!recipes || recipes.length === 0) {
            throw new AppError(ErrorTypes.NO_RECIPES_FOUND, "Recipes not found", 404, true);
        }
        return recipes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getAllRecipesIngredientByIngredientIds ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get all recipes from database", 500, false);
    }
};



// const checkIfRecipeExists = async (recipeId) => {
//     let sql = "select id from recipes where name = ?";
//     let parameters = [recipeId];
//     try {
//         let recipeId = await executeWithParameters(sql, parameters);
//         if (!recipeId) {
//             return false;
//         }
//         else {
//             return true;
//         }
//     } catch (error) {
//         console.log(`${calculateCurrentTime()} - recipesDal.checkIfRecipeExists ${error.message}`);
//         throw new AppError(ErrorTypes.DB_ERROR, "Failed to check if recipe exists in database", 500, false);
//     }
// }

const getRecipe = async (recipeId) => {
    let sql = `SELECT id, title, description, image, steps, user_id as userId, likes_amount as likesAmount FROM recipes WHERE id = ?`;
    let parameters = [recipeId];
    try {
        let recipes = await executeWithParameters(sql, parameters);
        const recipe = recipes[0];
        return recipe;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getRecipe ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get recipe from database", 500, false);
    }
}
const deleteRecipe = async (recipeId, connection) => {
    let sql = "delete from recipes where id = ?";
    let parameters = [recipeId];
    try {
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.deleteRecipe ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete recipe from database", 500, false);
    }
}

const deleteIngredientsRecipesTableColumn = async (recipeId, connection) => {
    let sql = "delete from recipe_ingredients where recipe_id = ?";
    let parameters = [recipeId];
    try {
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.deleteIngredientsRecipesTableColumn ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete recipe_ingredients from database", 500, false);
    }
}
const deleteTagsRecipesTableColumn = async (recipeId, connection) => {
    let sql = "delete from recipe_tags where recipe_id = ?";
    let parameters = [recipeId];
    try {
        await executeWithParameters(sql, parameters, connection);
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.deleteTagsRecipesTableColumn ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to delete recipe_tags from database", 500, false);
    }
}

const getAllRecipesByIngredientId = async (ingredientId) => {
    let sql = `SELECT 
    r.id, 
    r.title, 
    r.description, 
    r.image, 
    r.steps, 
    r.user_id AS userId, 
    r.likes_amount AS likesAmount 
  FROM 
    recipes.recipes r 
  JOIN 
    recipes.recipe_ingredients ri ON r.id = ri.recipe_id 
  WHERE 
    ri.ingredient_id = ? `;

    let parameters = [ingredientId]
    try {
        let recipes = await executeWithParameters(sql, parameters);
        return recipes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getAllRecipes ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get all recipes from database", 500, false);
    }
}
const getAllRecipesByTagDal = async (tagName) => {
    let sql = `SELECT 
    r.id, 
    r.title, 
    r.description, 
    r.image, 
    r.steps, 
    r.user_id AS userId, 
    r.likes_amount AS likesAmount 
  FROM 
    recipes.recipes r 
  JOIN 
    recipes.recipe_tags rt ON r.id = rt.recipe_id 

    JOIN
    recipes.tags t on rt.tag_id=t.id

  WHERE 
    t.name = ? `;

    let parameters = [tagName]
    try {
        let recipes = await executeWithParameters(sql, parameters);
        return recipes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getAllRecipes ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get all recipes from database", 500, false);
    }
}

const getAllRecipesByUserIdDal = async (userId) => {
    let sql = `SELECT 
    r.id, 
    r.title, 
    r.description, 
    r.image, 
    r.steps, 
    r.user_id AS userId, 
    r.likes_amount AS likesAmount
  FROM 
    recipes.recipes r 

  WHERE 
    r.user_id = ? `;

    let parameters = [userId]
    try {
        let recipes = await executeWithParameters(sql, parameters);
        return recipes;
    } catch (error) {
        console.log(`${calculateCurrentTime()} - recipesDal.getAllRecipes ${error.message}`);
        throw new AppError(ErrorTypes.DB_ERROR, "Failed to get all recipes from database", 500, false);
    }
}


export {
    addRecipe,
    linkRecipeWithIngredients,
    linkRecipeWithTags,
    getAllRecipes,
    updateLikeCounter,
    // checkIfRecipeExists,
    getRecipe,
    deleteRecipe,
    deleteIngredientsRecipesTableColumn,
    deleteTagsRecipesTableColumn,
    getAllRecipesByIngredientId,
    getAllRecipesByTagDal,
    getAllRecipesByUserIdDal,
    updateRecipeDal,
    getAllRecipesIngredientByIngredientIds
};
