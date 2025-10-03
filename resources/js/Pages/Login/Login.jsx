import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import authService from '@/services/authService'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [debugInfo, setDebugInfo] = useState(null)

    const validateForm = () => {
        let isValid = true
        const newErrors = { email: '', password: '' }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
            isValid = false
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
            isValid = false
        } else if (formData.password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setDebugInfo(null)
    
    if (validateForm()) {
        setLoading(true)
        
        try {
            console.log('🔄 Sending login data:', formData)
            const response = await authService.login(formData)
            console.log('✅ Full login response:', response)
            
            // Handle your actual API response structure
            if (response.responseData?.token) {
                // Your actual API structure
                const token = response.responseData.token
                const user = response.responseData.user
                
                localStorage.setItem('auth_token', token)
                localStorage.setItem('user', JSON.stringify(user))
                console.log('🎉 Login successful! Token:', token)
                console.log('🎉 User data:', user)
                
                // Redirect to dashboard
                router.visit('/create_blog')
            } else if (response.token) {
                // Fallback: direct token (if you change backend later)
                localStorage.setItem('auth_token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                router.visit('/create_blog')
            } else {
                console.log('❌ No token found in expected locations')
                console.log('🔍 Available keys in response:', Object.keys(response))
                setApiError('Login successful but token not found in expected format')
                setDebugInfo({ 
                    fullResponse: response,
                    availableKeys: Object.keys(response)
                })
            }
        } catch (error) {
            console.log('❌ Login error:', error)
            console.log('📦 Error response data:', error.response?.data)
            
            // Store debug info
            setDebugInfo({
                requestData: formData,
                errorResponse: error.response?.data,
                errorStatus: error.response?.status,
            })

            // Handle different error formats
            const serverError = error.response?.data
            
            if (serverError?.responseMessage) {
                if (typeof serverError.responseMessage === 'object') {
                    const errorMessages = Object.values(serverError.responseMessage).flat()
                    setApiError(errorMessages.join(', '))
                } else {
                    setApiError(serverError.responseMessage)
                }
            } else if (serverError?.message) {
                setApiError(serverError.message)
            } else {
                setApiError('Login failed. Please try again.')
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
        
        // Clear API error when user starts typing
        if (apiError) {
            setApiError('')
            setDebugInfo(null)
        }
    }

    // Test function to debug API
    const testApiConnection = async () => {
        console.log('🧪 Testing API connection...')
        const testData = {
            email: 'test@example.com',
            password: 'testpassword123'
        }
        
        setLoading(true)
        try {
            const response = await authService.login(testData)
            console.log('✅ API Test Response:', response)
            setApiError('API connection successful! Response: ' + JSON.stringify(response))
        } catch (error) {
            console.log('❌ API Test Error:', error.response?.data)
            setApiError('API Test Failed: ' + (error.response?.data?.message || error.message))
            setDebugInfo({
                testError: error.response?.data,
                status: error.response?.status
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Login - Urban Hub Blogs</title>
            </Head>

            <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {/* Navigation */}
                <nav className="absolute top-0 left-0 right-0 bg-gray-800 border-b border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                UrbanHub
                            </Link>
                            <div className="flex space-x-4">
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Access your UrbanHub account
                        </p>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-gray-800 py-8 px-6 shadow sm:rounded-lg sm:px-10 border border-gray-700">
                        {/* API Error Message */}
                        {apiError && (
                            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-sm">
                                <div className="font-semibold flex items-center">
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {apiError.includes('API Test') ? 'API Test Result' : 'Login Error'}
                                </div>
                                <div className="mt-1">{apiError}</div>
                                
                                {/* Debug Information - Remove in production */}
                                {debugInfo && (
                                    <details className="mt-3 border-t border-red-600 pt-2">
                                        <summary className="cursor-pointer text-xs text-red-200 hover:text-red-100">
                                            Debug Details (Development Only)
                                        </summary>
                                        <div className="mt-2 p-2 bg-gray-900 rounded text-xs font-mono">
                                            <div><strong>Request Data:</strong> {JSON.stringify(debugInfo.requestData || formData)}</div>
                                            <div><strong>Response Status:</strong> {debugInfo.errorStatus || debugInfo.status}</div>
                                            <div><strong>Full Response:</strong> {JSON.stringify(debugInfo.errorResponse || debugInfo.testError, null, 2)}</div>
                                        </div>
                                    </details>
                                )}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.email 
                                                ? 'border-red-500 bg-red-900/20' 
                                                : 'border-gray-600 bg-gray-700 text-white'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                        Password
                                    </label>
                                  
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.password 
                                                ? 'border-red-500 bg-red-900/20' 
                                                : 'border-gray-600 bg-gray-700 text-white'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>
                              <Link 
                                        href="#" 
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                                        loading 
                                            ? 'opacity-50 cursor-not-allowed from-blue-400 to-purple-500' 
                                            : 'hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                                    }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Development Tools - Remove in production */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={testApiConnection}
                                        disabled={loading}
                                        className="text-xs text-gray-400 hover:text-gray-300 underline disabled:opacity-50"
                                    >
                                        Test API Connection
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link 
                                    href="/register" 
                                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}