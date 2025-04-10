import request from "../utils/request.js";

const API_URL = 'http://localhost:5000/api/posts';

export const getPostsByTeam = async (teamId) => {
    try {
        const response = await fetch(`${API_URL}/team/${teamId}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await fetch(`${API_URL}/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

export const createPost = async (postData, authToken) => {
    try {
        await request.post('http://localhost:5000/api/posts', postData, authToken);
    } catch (err) {
        console.error("Create post failed:", err.message);
        throw new Error('Failed to create post');
    }
};

export const deletePost = async (postId, token) => {
    try {
        await request.delete(`${API_URL}/${postId}`, token);
    } catch (error) {
        throw new Error("Failed to delete post");
    }
};

export const editPost = async (postId, postData, token) => {
    try {
        const data = await request.put(
            `${API_URL}/${postId}`,
            postData,
            token
        );
        return data;
    } catch (error) {
        throw new Error("Failed to update post");
    }
};

export const createComment = async (postId, commentText, token) => {
    try {
        const data = await request.post(
            `${API_URL}/${postId}/comments`,
            { text: commentText },
            token
        );
        return data;
    } catch (error) {
        throw new Error("Failed to add comment");
    }
};

export const getCommentById = async (postId, commentId) => {
    try {
        const response = await fetch(`${API_URL}/${postId}/comments/${commentId}`);
        if (!response.ok) throw new Error('Failed to fetch comment');
        return await response.json();
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
};

export const deleteComment = async (postId, commentId, token) => {
    try {
        await request.delete(`${API_URL}/${postId}/comments/${commentId}`, token);
    } catch (error) {
        throw new Error("Failed to delete comment");
    }
};

// export const editComment = async (postId, commentId, { text }, token) => {
//     try {
//         await request.put(
//             `${API_URL}/${postId}/comments/${commentId}`,
//             { text },
//             token
//         );
//     } catch (error) {
//         throw new Error("Failed to edit comment");
//     }
// };
