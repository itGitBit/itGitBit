import express from 'express';
const router = express.Router();
import {addComment, getAllComments, getAllCommentsByRecipeId, getComment, updateComment, deleteComment} from '../logic/comments-logic.js';
import { tryCatch } from '../utils/trycatch.js';

const server = express();


router.post('/', tryCatch(async (request, response) => {
    let comment = request.body;
    await addComment(comment);
    response.status(201).json({ message: 'Comment added successfully' });
}));
//checked and works 16.02

router.get('/', tryCatch(async (request, response) => {
    const comments = await getAllComments();
    response.status(200).json(comments);
}));
//checked and works 16.02


router.get('/byrecipe/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    const comments = await getAllCommentsByRecipeId(recipeId);
    response.status(200).json(comments);
}));
//checked and works 16.02

router.get('/byid/:commentId', tryCatch(async (request, response) => {
    const commentId = request.params.commentId;
    const comment = await getComment(commentId);
    response.status(200).json(comment);
}));
//checked and works 16.02

router.put('/:commentId', tryCatch(async (request, response) => {
    const commentId = request.params.commentId;
    const comment = request.body;
    comment.id = commentId;
    await updateComment(comment);
    response.status(200).json({ message: 'Comment updated successfully' });
}));
//checked and works 16.02

router.delete('/:commentId', tryCatch(async (request, response) => {
    const commentId = request.params.commentId;
    await deleteComment(commentId);
    response.status(200).json({ message: 'Comment deleted successfully' });
}));
//checked and works 16.02

export default router;
