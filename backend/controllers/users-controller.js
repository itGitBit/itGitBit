import express from 'express';
const router = express.Router();
import { register, login, getUser, getAllUsers, updateUser, deleteUser, updatePassword } from '../logic/users-logic.js';
import { tryCatch } from '../utils/trycatch.js';


router.post('/signup', tryCatch(async (request, response) => {
    let user = request.body;
    await register(user);
    response.status(200).json({ message: 'User registered successfully' });

})
);


router.post('/login', tryCatch(async (request, response) => {
    let userLoginDetails = request.body;
    let { accessToken, refreshToken } = await login(userLoginDetails);
    response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}));

// router.post('/token', tryCatch(async (request, response) => {
//     const refreshToken = request.body.token;
//     if (refreshToken == null) return response.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
//         if (error) return response.sendStatus(403);
//         const accessToken = generateAccessToken({ username: user.username, type: user.type, id: user.id });
//         response.json({ accessToken: accessToken });
//     });
// }));

router.get('/:userId', tryCatch(async (request, response) => {
    const userId = request.params.userId;
    const user = await getUser(userId);
    response.status(200).json(user);
}));
router.get('/', tryCatch(async (request, response) => {
    const users = await getAllUsers();
    response.status(200).json(users);
}));


router.put('/', tryCatch(async (request, response) => {
    const user = request.body;
    const newUser = await updateUser(user);
    response.status(200).json({ username: newUser.username, email: newUser.email, profilePicture: newUser.profilePicture, id: newUser.id });
}
));


router.put('/password', tryCatch(async (request, response) => {
    const userId = request.body.id;
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.newPassword;
    const message = await updatePassword(userId, oldPassword, newPassword);
    response.status(200).json({ message });
}));


router.delete('/:userId', tryCatch(async (request, response) => {
    const userId = request.params.userId;
    await deleteUser(userId);
    response.status(200).json({ message: 'User deleted successfully' });
}));

export default router;

