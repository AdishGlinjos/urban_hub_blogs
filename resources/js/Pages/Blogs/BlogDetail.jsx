import { Head, Link, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import blogService from '@/services/blogService' // Add this back

export default function BlogDetail() {
    const { props } = usePage()
    const blogId = props.blogId
    
    console.log('🔍 Initial props:', props)
    console.log('🔍 Blog ID:', blogId)

    const [blog, setBlog] = useState({
        id: blogId,
        blog_titile: "Reviews Not Found " ,
        blog_content: "",
        posted_date: new Date().toISOString()
    })
    
    const [reviews, setReviews] = useState([])
    const [reviewsLoading, setReviewsLoading] = useState(true) // Change to true

    // Add back the API call
    useEffect(() => {
        console.log('🔄 useEffect running, fetching reviews...')
        fetchReviews()
    }, [blogId])

    const fetchReviews = async () => {
        try {
            console.log('📡 Calling blogService.getReviews...')
            const response = await blogService.getReviews(blogId)
            console.log('✅ API Response:', response)
            
            if (response && response.responseStatus === true) {
                console.log('📝 Reviews data found:', response.responseData?.reviews)
                setReviews(response.responseData?.reviews || [])
                
                // Update blog data if available
                if (response.responseData?.reviews?.length > 0 && response.responseData.reviews[0].blog) {
                    setBlog(response.responseData.reviews[0].blog)
                }
            } else {
                console.log('❌ API returned false status')
                setReviews([])
            }
        } catch (error) {
            console.error('💥 Error fetching reviews:', error)
            setReviews([])
        } finally {
            setReviewsLoading(false)
        }
    }

    // const openReviewModal = () => {
    //     console.log('Opening modal')
    // }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date'
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return 'Recent'
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch (err) {
            return 'Recent'
        }
    }

    return (
        <>
            <Head>
                <title>Debug Blog - Urban Hub Blogs</title>
            </Head>

            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-2xl font-bold text-white">
                            UrbanHub
                        </Link>
                        <Link href="/blogs" className="text-gray-300 hover:text-white">
                            All Blogs
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Blog Content */}
                    <div className="bg-gray-800 rounded-lg p-8 mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {blog.blog_titile}
                        </h1>
                        <p className="text-gray-500 mb-2">
                            Posted on {formatDate(blog.posted_date)}
                        </p>
                        <p className="text-gray-300">
                            {blog.blog_content}
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-gray-800 rounded-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Reviews ({reviews.length})
                                {reviewsLoading && <span className="text-blue-400 text-sm ml-2">Loading...</span>}
                            </h2>
                            {/* <button
                                onClick={openReviewModal}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg"
                            >
                                Write Review
                            </button> */}
                        </div>

                        {reviewsLoading ? (
                            <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="text-gray-400 mt-2">Loading reviews...</p>
                            </div>
                        ) : reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-gray-700 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold text-white">
                                                {review.name || 'Anonymous'}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-gray-300">{review.review}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-4">No reviews yet</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}