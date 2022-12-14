import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   }
   return req
})

const roomApi = {
   getAllRooms: userId => API.get('/rooms/' + userId),
   createRoom: data => API.post('/rooms', data),
   joinRoom: (id, data) => API.patch(`/rooms/${id}/join`, data),
   leaveRoom: (id, userId) => API.patch(`/rooms/${id}/leave`, { userId }),
   editRoom: (id, data) => API.put('/rooms/' + id, data),
   deleteRoom: (id, userId) => API.delete('/rooms/' + id, { userId }),
}

export default roomApi
