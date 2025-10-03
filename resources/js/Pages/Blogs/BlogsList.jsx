import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import blogService from '@/services/blogService'
import Swal from 'sweetalert2';

export default function BlogsList() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [pagination, setPagination] = useState({})
    const [showReviewPopup, setShowReviewPopup] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [reviewForm, setReviewForm] = useState({
        name: '',
        email: '',
        review: ''
    })
    const [reviewError, setReviewError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async (page = 1) => {
        try {
            setLoading(true)
            const response = await blogService.getBlogs(page)

            if (response.responseStatus) {
                setBlogs(response.responseData.data || [])
                setPagination({
                    currentPage: response.responseData.current_page,
                    lastPage: response.responseData.last_page,
                    total: response.responseData.total,
                    perPage: response.responseData.per_page
                })
            } else {
                setError('Failed to fetch blogs')
            }
        } catch (err) {
            console.error('Error fetching blogs:', err)
            setError('Failed to load blogs')
        } finally {
            setLoading(false)
        }
    }

    const truncateContent = (content, wordLimit = 15) => {
        if (!content) return ''
        const words = content.split(' ')
        if (words.length <= wordLimit) return content
        return words.slice(0, wordLimit).join(' ') + '...'
    }

    const truncateTitle = (title, wordLimit = 8) => {
        if (!title) return ''
        const words = title.split(' ')
        if (words.length <= wordLimit) return title
        return words.slice(0, wordLimit).join(' ') + '...'
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const handleAddReview = (blog) => {
        setSelectedBlog(blog)
        setReviewForm({
            name: '',
            email: '',
            review: ''
        })
        setReviewError('')
        setShowReviewPopup(true)
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        // Validate review field is mandatory
        if (!reviewForm.review.trim()) {
            setReviewError('Review is required')
            return
        }

        setSubmitting(true)
        setReviewError('')

        try {
            // Prepare review data for API
            const reviewData = {
                blog_id: selectedBlog.id,
                name: reviewForm.name.trim() || null,
                email: reviewForm.email.trim() || null,
                review: reviewForm.review.trim()
            }

            console.log('📤 Submitting review data:', reviewData)

            // Call the submitReview API
            const response = await blogService.submitReview(reviewData)

            console.log('✅ Review submitted successfully:', response)

            if (response.responseStatus) {
                // Reset form and close popup
                setReviewForm({
                    name: '',
                    email: '',
                    review: ''
                })
                setReviewError('')
                setShowReviewPopup(false)

                // Show success message with better styling
                setTimeout(() => {
                    Swal.fire({
                        title: 'Thank you!',
                        text: ' Review submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }, 100);
            } else {
                setReviewError(response.message || 'Failed to submit review. Please try again.')
            }

        } catch (err) {
            console.error('❌ Error submitting review:', err)

            if (err.response) {
                const errorMessage = err.response.data?.message ||
                    err.response.data?.error ||
                    'Failed to submit review. Please try again.'
                setReviewError(errorMessage)
            } else if (err.request) {
                setReviewError('Network error. Please check your connection and try again.')
            } else {
                setReviewError('An unexpected error occurred. Please try again.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    const handleReviewChange = (e) => {
        const { name, value } = e.target
        setReviewForm(prev => ({
            ...prev,
            [name]: value
        }))
        if (name === 'review' && reviewError) {
            setReviewError('')
        }
    }

    const closeReviewPopup = () => {
        if (!submitting) {
            setShowReviewPopup(false)
            setSelectedBlog(null)
            setReviewError('')
        }
    }

    return (
        <>
            <Head>
                <title>Blogs - Urban Hub Blogs</title>
            </Head>

            {/* Enhanced Navigation */}
            <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300">
                            UrbanHub
                        </Link>
                        <div className="flex space-x-6">
                            <Link href="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                                Home
                            </Link>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                                Write Blog
                            </Link>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <div className="text-center mb-16">
                        <div className="relative inline-block mb-6">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-30"></div>
                            <h1 className="relative text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                                Latest Blogs
                            </h1>
                        </div>
                        <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                            Discover amazing stories, insights, and perspectives from our vibrant community of writers and thinkers.
                        </p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-6 bg-red-900/30 border-l-4 border-red-500 rounded-r-lg backdrop-blur-sm">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-300 font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Loading State */}
                    {loading && (
                        <div className="text-center py-20">
                            <div className="relative inline-block">
                                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0 opacity-50" style={{ animationDirection: 'reverse' }}></div>
                            </div>
                            <p className="text-gray-400 text-lg mt-6 font-medium">Loading amazing content...</p>
                        </div>
                    )}

                    {/* Enhanced Blogs Grid */}
                    {!loading && blogs.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog, index) => (
                                <div
                                    key={blog.id}
                                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content */}
                                    <div className="relative p-6">
                                        {/* Blog Title */}
                                        <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3rem] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                                            {truncateTitle(blog.blog_titile || blog.title, 8)}
                                        </h2>

                                        {/* Blog Content */}
                                        <p className="text-gray-300 mb-6 leading-relaxed min-h-[4.5rem] group-hover:text-gray-200 transition-colors duration-300">
                                            {truncateContent(blog.blog_content || blog.content, 15)}
                                        </p>

                                        {/* Posted Date */}
                                        <div className="flex items-center text-gray-500 mb-6 group-hover:text-gray-400 transition-colors duration-300">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">{formatDate(blog.posted_date || blog.created_at)}</span>
                                        </div>

                                        {/* Enhanced Buttons Container */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link
                                                href={`/blogs/${blog.id}`}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                                            >
                                                <span>Read More</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>

                                            <button
                                                onClick={() => handleAddReview(blog)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                                            >
                                                <span>Add Review</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Enhanced No Blogs Message */}
                    {!loading && blogs.length === 0 && (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">No Blogs Yet</h3>
                                <p className="text-gray-400 mb-8">Be the first to share your story and inspire our community.</p>
                                <Link
                                    href="/blogs/create"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Write Your First Blog
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Pagination */}
                    {!loading && pagination.lastPage > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-16">
                            <button
                                onClick={() => fetchBlogs(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 1}
                                className={`flex items-center px-6 py-3 rounded-xl border border-gray-600 font-medium transition-all duration-300 ${pagination.currentPage === 1
                                        ? 'opacity-50 cursor-not-allowed text-gray-500'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 hover:transform hover:scale-105'
                                    }`}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-700/50">
                                <span className="text-gray-300 font-medium">Page</span>
                                <span className="text-white font-bold">{pagination.currentPage}</span>
                                <span className="text-gray-400">of</span>
                                <span className="text-purple-400 font-bold">{pagination.lastPage}</span>
                            </div>

                            <button
                                onClick={() => fetchBlogs(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.lastPage}
                                className={`flex items-center px-6 py-3 rounded-xl border border-gray-600 font-medium transition-all duration-300 ${pagination.currentPage === pagination.lastPage
                                        ? 'opacity-50 cursor-not-allowed text-gray-500'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 hover:transform hover:scale-105'
                                    }`}
                            >
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Review Popup */}
            {showReviewPopup && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 max-w-md w-full transform animate-slideUp">
                        {/* Popup Header */}
                        <div className="relative p-6 border-b border-gray-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            Share Your Thoughts
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {truncateTitle(selectedBlog?.blog_titile || selectedBlog?.title, 6)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeReviewPopup}
                                    disabled={submitting}
                                    className={`p-2 rounded-lg transition-all duration-300 ${submitting
                                            ? 'opacity-50 cursor-not-allowed text-gray-500'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Popup Form */}
                        <form onSubmit={handleReviewSubmit} className="p-6">
                            <div className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Name (Optional)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={reviewForm.name}
                                        onChange={handleReviewChange}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Enter your name"
                                        disabled={submitting}
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email (Optional)
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={reviewForm.email}
                                        onChange={handleReviewChange}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Enter your email"
                                        disabled={submitting}
                                    />
                                </div>

                                {/* Review Field */}
                                <div>
                                    <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                            Your Review <span className="text-red-400 ml-1">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        id="review"
                                        name="review"
                                        value={reviewForm.review}
                                        onChange={handleReviewChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
                                        placeholder="Share your thoughts about this blog..."
                                        required
                                        disabled={submitting}
                                    />
                                    {reviewError && (
                                        <div className="flex items-center mt-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
                                            <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-red-300 text-sm">{reviewError}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-700/50">
                                <button
                                    type="button"
                                    onClick={closeReviewPopup}
                                    disabled={submitting}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${submitting
                                            ? 'opacity-50 cursor-not-allowed text-gray-500 border border-gray-600'
                                            : 'text-gray-300 border border-gray-600 hover:text-white hover:bg-gray-700/50 hover:border-gray-500'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${submitting
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:from-green-600 hover:to-teal-700 hover:shadow-xl'
                                        }`}
                                >
                                    {submitting ? (
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Submitting...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                            Submit Review
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add custom animations to your global CSS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    )
}