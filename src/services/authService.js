import httpService  from './httpService'

import jwt_decode from "jwt-decode";

const tokenKey = 'auth_token'

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwt_decode(jwt);
    return null;
}
  
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    logout,
    getCurrentUser,
    getJwt,
};