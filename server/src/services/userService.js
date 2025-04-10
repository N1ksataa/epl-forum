import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Team from '../models/Team.js';

const userService = {
    async getAllUsers() {
        return await User.find();
    },

    async register(username, email, password, favoriteTeam) {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            const error = new Error('Username already exists');
            error.status = 400;
            throw error;
        }
    
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            const error = new Error('Email already exists');
            error.status = 400;
            throw error;
        }
    
        const user = new User({ username, email, password, favoriteTeam });
        const savedUser = await user.save();
    
        if (favoriteTeam) {
            const team = await Team.findById(favoriteTeam);
            if (team) {
                team.fans.push(savedUser._id);
                await team.save();
            }
        }
    
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;
    
        return userWithoutPassword;
    },

    async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }
    
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
    
        return { token, user: userWithoutPassword };
    },

async getUserById(id) {
    const user = await User.findById(id)
        .select('-password')
        .populate('favoriteTeam', 'name');
    
    if (!user) {
        throw new Error('User not found');
    }
    
    return user;
},

async updateUser(id, data) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }

    if (data.username === user.username && data.email === user.email) {
        throw new Error('No changes detected');
    }

    if (data.username && data.username !== user.username) {
        const existingUsername = await User.findOne({ username: data.username });
        if (existingUsername) {
            throw new Error('Username already exists');
        }
        user.username = data.username;
    }

    if (data.email && data.email !== user.email) {
        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
            throw new Error('Email already exists');
        }
        user.email = data.email;
    }

    await user.save();
    return { username: user.username, email: user.email };
},

    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);
        if (!user || !(await user.comparePassword(oldPassword))) {
            throw new Error('Invalid old password');
        }

        if (oldPassword === newPassword) {
            throw new Error('New password must be different from the old password');
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    },
};

export default userService;
