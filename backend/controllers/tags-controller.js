import express from 'express';
const router = express.Router();
import { addTag, getAllTags, getTagsByRecipeId, updateTag, deleteTag } from '../logic/tags-logic.js';
import { tryCatch } from '../utils/trycatch.js';



router.post('/', tryCatch(async (request, response) => {
    let tag = request.body;
    await addTag(tag);
    response.status(201).json({ message: 'Tag added successfully' });
}));

router.get('/', tryCatch(async (request, response) => {
    const tags = await getAllTags();
    response.status(200).json(tags);
}));

router.get('/:tagId', tryCatch(async (request, response) => {
    const tagId = request.params.tagId;
    const tag = await getTag(tagId);
    response.status(200).json(tag);
}));

router.get('/byrecipe/:recipeId', tryCatch(async (request, response) => {
    const recipeId = request.params.recipeId;
    const tags = await getTagsByRecipeId(recipeId);
    response.status(200).json(tags);
}));

router.put('/:tagId', tryCatch(async (request, response) => {
    const tagId = request.params.tagId;
    const tag = request.body;
    tag.id = tagId;
    await updateTag(tag);
    response.status(200).json({ message: 'Tag updated successfully' });
}));

router.delete('/:tagId', tryCatch(async (request, response) => {
    const tagId = request.params.tagId;
    await deleteTag(tagId);
    response.status(200).json({ message: 'Tag deleted successfully' });
}));

export default router;
