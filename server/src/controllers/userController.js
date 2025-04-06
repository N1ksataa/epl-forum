import { Router } from 'express';
import userService from '../services/userService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.json({ message: 'Error retrieving users' });
    }
});

userController.post('/register', async (req, res) => {
    const { username, email, password, favoriteTeam } = req.body;

    try {
        const user = await userService.register(username, email, password, favoriteTeam);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await userService.login(username, password);
        res.json({
            token: result.token,
            user: result.user,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});


userController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (err) {
        res.json({ message: 'User not found' });
    }
});

userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});


userController.put('/profile', authMiddleware, async (req, res) => {
    const { username, email } = req.body;

    try {
        const updatedUser = await userService.updateUser(req.user.id, { username, email });
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default userController;
