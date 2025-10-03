import { Head, router, Link } from '@inertiajs/react'
import { useState } from 'react'
import blogService from '@/services/blogService'
import authService from "@/services/authService";


export default function CreateBlog() {
      const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await authService.logout();
            window.location.href = "/"; // redirect to home or login
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [success, setSuccess] = useState('')

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
            isValid = false
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')
        setSuccess('')

        if (validateForm()) {
            setLoading(true)

            try {
                console.log('🔄 Creating blog:', formData)
                const response = await blogService.createBlog(formData)
                console.log('✅ Blog created:', response)

                if (response.responseStatus === true) {
                    setSuccess('Blog created successfully!')
                    // Reset form
                    setFormData({
                        title: '',
                        content: ''
                    })
                    // Optionally redirect to blogs list
                    // router.visit('/blogs')
                } else {
                    setApiError('Blog creation failed')
                }
            } catch (error) {
                console.error('❌ Blog creation error:', error)

                const serverError = error.response?.data
                if (serverError?.responseMessage) {
                    if (typeof serverError.responseMessage === 'object') {
                        const errorMessages = Object.values(serverError.responseMessage).flat()
                        setApiError(errorMessages.join(', '))
                    } else {
                        setApiError(serverError.responseMessage)
                    }
                } else if (serverError?.errors) {
                    const errorMessages = Object.values(serverError.errors).flat()
                    setApiError(errorMessages.join(', '))
                } else {
                    setApiError('Failed to create blog. Please try again.')
                }
            } finally {
                setLoading(false)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        if (apiError) setApiError('')
        if (success) setSuccess('')
    }

    return (
        <>
            <Head>
                <title>Create Blog - Urban Hub Blogs</title>
            </Head>
            <nav className="bg-gray-900 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">

                        {/* Brand / Logo */}
                        <div className="text-xl font-bold text-white">
                            Urban Hub
                        </div>

                        {/* Links */}
                        <div className="flex space-x-6">
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blogs"
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                Blogs
                            </Link>
                            <a
                                href="#"
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>


            <div className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
                            Create New Blog
                        </h1>

                        {/* Success Message */}
                        {success && (
                            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg text-green-300 text-sm">
                                {success}
                            </div>
                        )}

                        {/* Error Message */}
                        {apiError && (
                            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-sm">
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                    Blog Title *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-600'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Enter blog title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                                )}
                            </div>

                            {/* Content Field */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                                    Blog Content *
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    disabled={loading}
                                    rows="10"
                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.content ? 'border-red-500' : 'border-gray-600'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Write your blog content here..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-400">{errors.content}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 ${loading
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                                        }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Blog...
                                        </div>
                                    ) : (
                                        'Create Blog'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}