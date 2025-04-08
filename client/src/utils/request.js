const request = async (method, url, data = null, token = null, logout = null) => {
    const headers = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (data && method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers,
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        if (response.status === 401 && typeof logout === 'function') {
            logout();
        }

        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || 'Request failed');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }

    return null;
};

export default {
    get: (url, token, logout) => request('GET', url, null, token, logout),
    post: (url, data, token, logout) => request('POST', url, data, token, logout),
    put: (url, data, token, logout) => request('PUT', url, data, token, logout),
    delete: (url, token, logout) => request('DELETE', url, null, token, logout),
};
