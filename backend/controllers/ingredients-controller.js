import express from 'express';
const router = express.Router();
import { addIngredient, getAllIngredients, getIngredient, getIngredientsByRecipeId, deleteIngredient } from '../logic/ingredients-logic.js';
import { tryCatch } from '../utils/trycatch.js';

const server = express();



router.post('/', tryCatch(async (request, response) => {
    let ingredient = request.body;
    await addIngredient(ingredient);
    response.status(201).json({ message: 'Ingredient added successfully' });
})
);
//checked and works 16.02

router.get('/', tryCatch(async (request, response) => {
    const ingredients = await getAllIngredients();
    response.status(200).json(ingredients);
}));
//checked and works 16.02

router.put('/:ingredientId', tryCatch(async (request, response) => {
    const ingredientId = request.params.ingredientId;
    const ingredient = request.body;
    ingredient.id = ingredientId;
    await updateIngredient(ingredient, ingredientId);
    response.status(200).json({ message: 'Ingredient updated successfully' });
}
));
//checked and works 16.02

router.get('/byid/:ingredientId', tryCatch(async (request, response) => {
    const ingredientId = request.params.ingredientId;
    const ingredient = await getIngredient(ingredientId);
    response.status(200).json(ingredient);
}));
//checked and works 16.02

router.get('/byrecipe/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    const ingredients = await getIngredientsByRecipeId(recipeId);
    response.status(200).json(ingredients);
}));
//checked and works 16.02

router.delete('/:ingredientId', tryCatch(async (request, response) => {
    const ingredientId = request.params.ingredientId;
    await deleteIngredient(ingredientId);
    response.status(200).json({ message: 'Ingredient deleted successfully' });
}));
//checked and works 16.02

export default router;
