import httpService from './httpService'

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



class CustomhttpService {
    
    constructor() {
        
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            },
        });

        // Set up request interceptor
        instance.interceptors.request.use(
            config => {
                const accessToken = localStorage.getItem('auth_token')
                if (accessToken) {
                    config.headers['access-token'] = accessToken
                } else {
                    config.headers['access-token'] = ''
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
  
        // Set up response interceptor
        instance.interceptors.response.use(
            response => response,
            error => Promise.reject(error)
        );
  
        this.instance = instance;
    }

    // Set authorization token in the headers
    setAuthToken = token => {
        if (token) {
            this.instance.defaults.headers.common['access-token'] = `${token}`;
        } else {
            delete this.instance.defaults.headers.common['access-token'];
        }
    }

    setTokenToLocalStorage = token => calStorage.setItem('auth_token', token)
}

class CustomAuthService extends CustomhttpService {

    async login( username, email, password ) {
        try {
            const response = await this.instance.post('/auth/register/', {
                username: username,
                email: email,
                password: password
            }); // Use the Axios instance from the parent class
            return response.data;
        } catch (error) {
            throw error;
        } 
    }
}
