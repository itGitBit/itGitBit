import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import errorHandler from './error/ErrorHandler.js';
import verify from 'jsonwebtoken';
const server = express();
import cors from 'cors';
import usersController from './controllers/users-controller.js';
import ingredientsController from './controllers/ingredients-controller.js';
import likesController from './controllers/likes-controller.js';
import commentsController from './controllers/comments-controller.js';
import recipesController from './controllers/recipes-controller.js';
import tagsController from './controllers/tags-controller.js';
import  calculateCurrentTime from './utils/calculate-time.js';




const authenticateToken = (request, response, next) => {
    if (request.path === '/users/login' || request.path === '/users/' || request.path === '/users/token') {

        next();
        return;
    }
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return response.sendStatus(401);
    verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return response.sendStatus(403).json({ message: 'invalid token' });
        request.user = user;
        next();
    })
};

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(json());
// server.use(authenticateToken);


server.use('/users', usersController);
server.use("/ingredients", ingredientsController);
server.use("/likes", likesController);
server.use("/comments", commentsController);
server.use("/recipes", recipesController);
server.use("/tags", tagsController);


server.use(errorHandler);
server.listen(3001, () => {
    console.log(`${calculateCurrentTime()} - Server is running on http://localhost:3001`);
});