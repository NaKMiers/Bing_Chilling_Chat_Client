import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_SERVER })

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   }
   return req
})

const userApi = {
   getUser: id => API.get('/users/' + id),
   editProfile: (id, data) => API.patch(`/users/${id}/profile`, data),
   changePassword: (id, data) => API.patch(`/users/${id}/password`, data),
}

export default userApi
