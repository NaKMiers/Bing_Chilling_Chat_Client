import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   }
   return req
})

const messageApi = {
   getAllMessages: userId => API.get('/messages/' + userId),
}

export default messageApi
