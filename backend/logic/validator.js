import Joi from 'joi';


const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });


const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid('admin', 'user').required(),
    profilePicture: Joi.string().max(400),
    active: Joi.boolean().valid(true)

});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});
const commentsSchema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(3).max(450).required(),
    userId: Joi.number().required(),
    recipeId: Joi.number().required()
});


const ingredientsSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(30).regex(/^[A-Za-z\s-]+$/).required()
});
const likesSchema = Joi.object({
    userId: Joi.number().required(),
    recipeId: Joi.number().required()
});

const recipeSchema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).max(45).required(),
    description: Joi.string().min(3).max(1000).required(),
    userId: Joi.number().required(),
    image: Joi.string().min(3).max(450),
    steps: Joi.string().min(3).max(1000).required(),
    ingredients: Joi.array().items(Joi.object({
        id: Joi.number(),
        name: Joi.string().min(3).max(30).regex(/^[A-Za-z\s-]+$/).required()
    })),
    tags: Joi.array().items(Joi.object({
        id: Joi.number(),
        name: Joi.string().min(3).max(30).regex(/^[A-Za-z\s-]+$/).required()
    })),
    likesAmount: Joi.number().valid(0).required(),

});

const tagsSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(30).regex(/^[A-Za-z\s]+$/).required()
});

const userSchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    profilePicture: Joi.string().max(400)
});

const newPasswordSchema = Joi.object({    
    password: Joi.string().min(6).max(30).required()
});


const validateLogin = validator(loginSchema);
const validateSignup = validator(signupSchema);
const validateIngredients = validator(ingredientsSchema);
const validateComments = validator(commentsSchema);
const validateLikes = validator(likesSchema);
const validateRecipe = validator(recipeSchema);
const validateTags = validator(tagsSchema);
const validateUserUpdate = validator(userSchema);
const validateNewPassword = validator(newPasswordSchema);


export {
    validateSignup,
    validateLogin,
    validateIngredients,
    validateComments,
    validateLikes,
    validateRecipe,
    validateTags,
    validateUserUpdate,
    validateNewPassword
};
