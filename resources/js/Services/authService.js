import api from './api'

export const authService = {
    // Login user
    login: async (credentials) => {

              try {
            const response = await api.post('/login', credentials)
            console.log('🔧 AuthService - Raw response:', response)
            console.log('🔧 AuthService - Response data:', response.data)
            return response.data
        } catch (error) {
            console.log('🔧 AuthService - Error:', error)
            throw error
        }

    },

    // Register user
    register: async (userData) => {
        const response = await api.post('/registration', userData)
        return response.data
    },

    // Logout user
    logout: async () => {
    try {
      const response = await api.post('/logout') // token attached automatically
      // Clear storage after logout
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      return response.data
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/user')
        return response.data
    }
}

export default authService