import express from 'express';
const router = express.Router();
import { addRecipe, getAllRecipes, updateRecipe, getAllRecipesByIngredients, deleteRecipe, getRecipe, getAllRecipesByIngredientId, getAllRecipesByTag, getAllRecipesByUserId } from '../logic/recipes-logic.js';
import { tryCatch } from '../utils/trycatch.js';

router.post('/', tryCatch(async (request, response) => {
    let recipe = request.body;
    let ingredients = request.body.ingredients;
    let tags = request.body.tags;
    await addRecipe(recipe, ingredients, tags);

    response.status(201).json({ message: 'Recipe added successfully' });
}));

router.post('/getbyingredients', tryCatch(async (request, response) => {
    let ingredients = request.body.ingredients;
    let recipes = await getAllRecipesByIngredients(ingredients);
    response.status(200).json(recipes);
}));

router.get('/', tryCatch(async (request, response) => {
    const recipesExtended = await getAllRecipes();
    response.status(200).json(recipesExtended);
}));

router.get('/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    const recipe = await getRecipe(recipeId);
    response.status(200).json(recipe);
}));

router.get('/byingredient/:ingredientId', tryCatch(async (request, response) => {
    const ingredientId = request.params.ingredientId;
    const recipes = await getAllRecipesByIngredientId(ingredientId);
    response.status(200).json(recipes);
}));

router.get('/bytag/:tagName', tryCatch(async (request, response) => {
    const tagName = request.params.tagName;
    const recipes = await getAllRecipesByTag(tagName);
    response.status(200).json(recipes);
}));



router.get('/byuser/:userId', tryCatch(async (request, response) => {
    const userId = request.params.userId;
    const recipes = await getAllRecipesByUserId(userId);
    response.status(200).json(recipes);
}));

router.put('/:recipeId', tryCatch(async (request, response) => {
    let recipe = request.body;
    recipe.id = request.params.recipeId;
    await updateRecipe(recipe);
    response.status(200).json({ message: 'Recipe updated successfully' });
}));

router.delete('/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    await deleteRecipe(recipeId);
    response.status(200).json({ message: 'Recipe deleted successfully' });
}));

export default router;