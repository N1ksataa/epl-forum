import { Router } from 'express';
import forumService from '../services/forumService.js';
import Team from '../models/Team.js';
import Post from '../models/Post.js';

const forumController = Router();

forumController.get('/', async (req, res) => {
    try {
        const forums = await forumService.getForums();
        res.json(forums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

forumController.get("/stats", async (req, res) => {
    try {
        const stats = await forumService.getForumStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

forumController.get('/trending', async (req, res) => {
    try {
        const posts = await forumService.getTrendingPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default forumController;