import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   }
   return req
})

const messageApi = {
   getAllMessages: (id, data) => API.post('/messages/' + id, data),
   createMessage: data => API.post('/messages', data),
   editMessage: (id, data) => API.put('/messages' + id, data),
   deleteMessage: (id, data) => API.delete('/messages' + id, data),
}

export default messageApi
