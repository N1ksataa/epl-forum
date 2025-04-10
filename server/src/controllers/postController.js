import { Router } from 'express';
import postService from '../services/postService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Team from '../models/Team.js';
import Post from '../models/Post.js';

const postController = Router();

postController.get("/", async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.post("/", authMiddleware, async (req, res) => {
    const authorId = req.user.id;
    const postData = req.body;

    try {
        const post = await postService.createPost(authorId, postData);
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.get("/:id", async (req, res) => {
    const { id: postId } = req.params;

    try {
        const post = await postService.getPostById(postId);
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.put("/:id", authMiddleware, async (req, res) => {
    const { id: postId } = req.params;
    const updatedData = req.body;
    const userId = req.user.id;

    try {
        const updatedPost = await postService.updatePost(postId, updatedData, userId);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.delete("/:id", authMiddleware, async (req, res) => {
    const { id: postId } = req.params;
    const userId = req.user.id;

    try {
        const deletedPost = await postService.deletePost(postId, userId);
        res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (err) {
        const isAuthError = err.message.includes("not authorized");
        res.status(isAuthError ? 403 : 500).json({ message: err.message });
    }
});



postController.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const posts = await postService.getPostsByUser(userId);
        res.json(posts);
    } catch (err) {
        console.error(`Error fetching user posts: ${err.message}`);
        res.status(500).json({ message: "Error fetching user posts" });
    }
});


postController.get("/team/:teamId", async (req, res) => {
    const { teamId } = req.params;
    try {
        const posts = await postService.getPostsByTeam(teamId);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.post("/:id/comments", authMiddleware, async (req, res) => {
    const { id: postId } = req.params;
    const { text: commentText } = req.body;
    const userId = req.user.id;

    try {
        const comment = await postService.addComment(postId, userId, commentText);
        

        const commentWithUser = {
            ...comment.toObject(),
            userId: {
                _id: req.user.id,
                username: req.user.username,
            },
        };

        res.json(commentWithUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.get("/:postId/comments/:commentId", async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const comment = await postService.getComment(postId, commentId);
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.put("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const { postId, commentId } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id;

    try {
        const updatedComment = await postService.editComment(postId, commentId, userId, commentText);
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

postController.delete("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    try {
        await postService.deleteComment(postId, commentId, userId);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        const isAuthError = err.message.includes("not authorized");
        res.status(isAuthError ? 403 : 500).json({ message: err.message });
    }
});

export default postController;
