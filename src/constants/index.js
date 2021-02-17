export const API_BASE_URL = 'https://my-recipe-stash.herokuapp.com';
// export const API_BASE_URL = 'https://localhost:3000';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = `https://my-recipe-stash.netlify.app/oauth2/redirect`

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
