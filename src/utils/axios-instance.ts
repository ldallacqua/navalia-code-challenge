import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId')
  if (userId) {
    config.headers['Authorization'] = `Bearer ${userId}`
  }
  return config
})

export default api
