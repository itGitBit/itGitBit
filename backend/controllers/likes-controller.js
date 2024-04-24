import express from 'express';
const router = express.Router();
import { addLike, deleteLike, getAllLikes, getAllLikesByRecipeId, getAllLikesByUserId, } from '../logic/likes-logic.js';
import { tryCatch } from '../utils/trycatch.js';


router.post('/', tryCatch(async (request, response) => {
    let like = request.body;
    let returnMessage = await addLike(like);
    response.status(200).json({ message: returnMessage });
}));
//checked and works 16.02

router.get('/', tryCatch(async (request, response) => {
    const likes = await getAllLikes();
    response.status(200).json(likes);
}
));
//checked and works 16.02

router.get('/byrecipe/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    const likes = await getAllLikesByRecipeId(recipeId);
    response.status(200).json(likes);
}));
//checked and works 16.02

router.get('/byuser/:userId', tryCatch(async (request, response) => {
    const userId = request.params.userId;
    const likes = await getAllLikesByUserId(userId);
    response.status(200).json(likes);
}));
//checked and works 16.02

router.delete('/:userId/:recipeId', tryCatch(async (request, response) => {
    const { userId, recipeId } = request.params;
    await deleteLike(userId, recipeId);
    response.status(200).json({ message: 'Like deleted successfully' });
}));
//checked and works 16.02



export default router;