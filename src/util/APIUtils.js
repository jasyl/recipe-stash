import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET',
        // mode: 'cors'
    });
}

export function getRecipes() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        // credentials: 'same-origin',
        url: API_BASE_URL + "/recipes",
        method: 'GET',
        // mode: 'cors'
    });
}

export function deleteRecipe(recipeId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        // credentials: 'same-origin',
        url: API_BASE_URL + "/recipes/" +recipeId,
        method: 'DELETE',
        // mode: 'cors'
    });
}

export function addExternalRecipe(urlString) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        // credentials: 'same-origin',
        url: API_BASE_URL + "/recipes?url=" + urlString,
        method: 'POST',
        // body: JSON.stringify({url: urlString})
        // mode: 'cors'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest),
        // mode: 'cors'
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest),
        // mode: 'cors'
    });
} 