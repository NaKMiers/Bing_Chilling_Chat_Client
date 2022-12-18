import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_SERVER })

const authApi = {
   login: data => API.post(`/auth/login`, data),
   register: data => API.post(`/auth/register`, data),
}

export default authApi
