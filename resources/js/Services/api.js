import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// Get CSRF token from meta tag
const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
}

// Add CSRF token to headers
api.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken()

// Add auth token to requests if exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Handle responses - improved error handling
api.interceptors.response.use(
    (response) => {
        console.log('🔧 API Interceptor - Response received:', response)
        return response
    },
    (error) => {
        console.log('🔧 API Interceptor - Error:', error)
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api