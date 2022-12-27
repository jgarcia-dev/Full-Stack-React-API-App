/**
 * Makes a fetch request with parameters forming the path and options for request
 * @param {string} path Will be appended to base path to create full path
 * @param {string} method Defines request method used
 * @param {object} body Data to included in body of request, defaults to null if none
 * @param {boolean} requiresAuth Indicates if fetch request will require authorization, defaults to false
 * @param {object} credentials User credentials for authorization, defaults to null
 * @return {Promise} Returns results of the fetch request
 */
const apiRequest = (path, method, body = null, requiresAuth = false, credentials = null) => {
    const apiBaseUrl = 'http://localhost:5000/api';
    const url = apiBaseUrl + path;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}

export default apiRequest;