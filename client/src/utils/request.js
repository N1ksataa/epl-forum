const request = async (method, url, data = null, token = null) => {
    const headers = {};

    if (token) {
        headers['X-Authorization'] = token;
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
        const error = await response.json();
        throw new Error(error.message);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }

    return null;
};

export default {
    get: (url, token) => request('GET', url, null, token),
    post: (url, data, token) => request('POST', url, data, token),
    put: (url, data, token) => request('PUT', url, data, token),
    delete: (url, token) => request('DELETE', url, null, token),
};
