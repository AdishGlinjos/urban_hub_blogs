import api from './api'

export const blogService = {
    // Create new blog
    createBlog: async (blogData) => {
        const response = await api.post('/create_blogs', blogData)
        return response.data
    },

    // Get all blogs with pagination
    getBlogs: async (page = 1, perPage = 10) => {
        const response = await api.get(`/show_blogs?page=${page}&per_page=${perPage}`)
        return response.data
    },

    // Get single blog by ID
    getBlog: async (id) => {
        const response = await api.get(`/blogs/${id}`)
        return response.data
    },

        getReviews: async (blogId) => {
        const response = await api.get(`/show_reviews?blog_id=${blogId}`)
        return response.data
        console.log(response.data);
    },

    // Submit review - with better error handling
    submitReview: async (reviewData) => {
        console.log('📤 submitReview called with data:', reviewData)
        
        try {
            const response = await api.post('/reviews', reviewData)
            console.log('✅ submitReview successful:', response.data)
            return response.data
        } catch (error) {
            console.error('❌ submitReview failed:', error)
            console.error('❌ Error details:', error.response?.data)
            throw error
        }
    }

}

export default blogService