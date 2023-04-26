import axios from 'axios'
import httpService from '../services/httpService'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const setAuthToken = token => (axios.defaults.headers.common['access-token'] = token)

const setTokenToLocalStorage = token => {
    localStorage.setItem('auth_token', token)
}
  
//axios request interceptor

axios.interceptors.request.use( 
    config => {
        const accessToken = localStorage.getItem('auth_token')
        if (accessToken) {
          config.headers['access-token'] = accessToken
        }
        else {
          config.headers['access-token'] = ''
        }
        return config
    },
    async error => { return Promise.reject(error) }
)

//axios response interceptor

axios.interceptors.response.use(
    response => { return response },
    async (error) => { return Promise.reject(error)}
)

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    setTokenToLocalStorage,
    setAuthToken
}
