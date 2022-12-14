import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

const authApi = {
   login: data => API.post(`/auth/login`, data),
   register: data => API.post(`/auth/register`, data),
}

export default authApi
