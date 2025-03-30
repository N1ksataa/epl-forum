import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Team from "../models/Team.js";

class PostService {
    async createPost(authorId, postData) {
        try {
            const post = new Post({ ...postData, author: authorId });
            await post.save();
            return post;
        } catch (error) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    async getPostsByUser(authorId) {
        try {
            const posts = await Post.find({ author: authorId })
                .populate("author", "username email")
                .populate("team", "name")
                .sort({ createdAt: -1 });
    
            return posts;
        } catch (error) {
            throw new Error(`Error fetching posts: ${error.message}`);
        }
    }

async getPostsByTeam(teamId) {
    try {
        const teamExists = await Team.findById(teamId);
        if (!teamExists) {
            throw new Error('Team not found');
        }

        const posts = await Post.find({ team: teamId })
            .populate("author", "username")
            .populate("team", "name logo")
            .populate({
                path: "comments",
                select: "text createdAt",
                populate: { path: "userId", select: "username" }
            });

        return posts;

    } catch (error) {
        throw error;
    }
}

    
async getPostById(postId) {
    try {
        const post = await Post.findById(postId)
            .populate("author", "username email")
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "username"
                }
            })
            .populate({
                path: "team",
                select: "name"
            });

        if (!post) {
            throw new Error("Post not found");
        }
        
        return post;
    } catch (error) {
        throw new Error(`Error fetching post: ${error.message}`);
    }
}


    async getAllPosts() {
        try {
            const posts = await Post.find()
                .populate("author", "username email")
                .populate("team", "name");
            return posts;
        } catch (error) {
            throw new Error(`Error fetching all posts: ${error.message}`);
        }
    }

    async updatePost(postId, updatedData, userId) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            if (post.author.toString() !== userId) {
                throw new Error("You are not authorized to update this post");
            }
            post.title = updatedData.title || post.title;
            post.content = updatedData.content || post.content;
            await post.save();
            return post;
        } catch (error) {
            throw new Error(`Error updating post: ${error.message}`);
        }
    }

    async deletePost(postId, userId) {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        
        if (!post.author.equals(userId)) {
            throw new Error('You are not authorized to delete this post');
        }
    
        await Comment.deleteMany({ postId });
        await Post.findByIdAndDelete(postId);
    
        return post;
    }
    

    async addComment(postId, userId, commentText) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            const comment = new Comment({
                postId,
                userId,
                text: commentText
            });
            await comment.save();
            post.comments.push(comment._id);
            await post.save();
            return comment;
        } catch (error) {
            throw new Error(`Error adding comment: ${error.message}`);
        }
    }

    async editComment(postId, commentId, userId, commentText) {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment || comment.postId.toString() !== postId) {
                throw new Error("Comment not found");
            }
            if (comment.userId.toString() !== userId) {
                throw new Error("You are not authorized to edit this comment");
            }
            comment.text = commentText;
            await comment.save();
            return comment;
        } catch (error) {
            throw new Error(`Error editing comment: ${error.message}`);
        }
    }

    async deleteComment(postId, commentId, userId) {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment || comment.postId.toString() !== postId) {
                throw new Error("Comment not found");
            }
            if (comment.userId.toString() !== userId) {
                throw new Error("You are not authorized to delete this comment");
            }
    
            await Comment.findByIdAndDelete(commentId);
    
            await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
    
        } catch (error) {
            throw new Error(`Error deleting comment: ${error.message}`);
        }
    }

}

export default new PostService();
