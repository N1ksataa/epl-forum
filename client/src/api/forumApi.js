const API_URL = 'http://localhost:5000/api/forum';

export const getForums = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch forums');
        return await response.json();
    } catch (error) {
        console.error('Error fetching forums:', error);
        throw error;
    }
};

export const getTeams = async () => {
    try {
        const data = await request.get('http://localhost:5000/api/forum');
        return data.map(item => item.team);
    } catch (err) {
        console.error("Failed to fetch teams", err);
        throw new Error('Failed to fetch teams');
    }
};

export const getForumStats = async () => {
    try {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) throw new Error('Failed to fetch forum stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching forum stats:', error);
        throw error;
    }
};

export const getTrendingPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/trending`);
        if (!response.ok) throw new Error('Failed to fetch trending posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching trending posts:', error);
        throw error;
    }
};