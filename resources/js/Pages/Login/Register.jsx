import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import Input from '@/Components/UI/Input'
import Button from '@/Components/UI/Button'
import authService from '@/services/authService'
import Swal from 'sweetalert2';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required'
            isValid = false
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
            isValid = false
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
            isValid = false
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
            isValid = false
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
            isValid = false
        }

        // Password confirmation validation
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Please confirm your password'
            isValid = false
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const showAlert = () => {
        alert("Hello! This is a simple alert in React JSX.");
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            console.log('🔄 Sending registration data:', formData)

            // Call the actual registration API
            const response = await authService.register(formData)
            console.log('✅ Registration response:', response)

            // Handle your API response structure
            if (response.responseData?.token) {
                // Registration successful - store token and user data
                const token = response.responseData.token
                const user = response.responseData.user

                localStorage.setItem('auth_token', token)
                localStorage.setItem('user', JSON.stringify(user))


                // Redirect to dashboard or home page
                router.visit('/create_blog')
            } else if (response.responseStatus === true) {
                Swal.fire({
                    title: '✅ Account created successfully!',
                    icon: 'success',
                    timer: 2500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: '#2d2d2d',       // dark background
                    color: '#ffffff',             // text color
                    iconColor: '#00ff00',         // success icon color
                });
                 router.visit('/login')
            } else {
                // Unexpected response format
                console.log('❌ Unexpected response format:', response)
                setApiError('Registration completed but unexpected response format')
            }

        } catch (error) {
            console.error('❌ Registration failed:', error)
            console.error('📦 Error response:', error.response?.data)

            // Handle API errors
            const serverError = error.response?.data

            if (serverError?.responseMessage) {
                // Your custom API error format
                if (typeof serverError.responseMessage === 'object') {
                    const errorMessages = Object.values(serverError.responseMessage).flat()
                    setApiError(errorMessages.join(', '))
                } else {
                    setApiError(serverError.responseMessage)
                }
            } else if (serverError?.errors) {
                // Laravel default validation errors
                const errorMessages = Object.values(serverError.errors).flat()
                setApiError(errorMessages.join(', '))
            } else if (serverError?.message) {
                setApiError(serverError.message)
            } else if (error.response?.status === 422) {
                setApiError('Validation failed. Please check your input.')
            } else {
                setApiError('Registration failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
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
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target

        // Validate individual field on blur
        let error = ''

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Full name is required'
                } else if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters'
                }
                break

            case 'email':
                if (!value) {
                    error = 'Email is required'
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Please enter a valid email address'
                }
                break

            case 'password':
                if (!value) {
                    error = 'Password is required'
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters'
                }
                break

            case 'password_confirmation':
                if (!value) {
                    error = 'Please confirm your password'
                } else if (value !== formData.password) {
                    error = 'Passwords do not match'
                }
                break
        }

        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }))
        }
    }

    return (
        <>
            <Head>
                <title>Sign Up - Urban Hub Blogs</title>
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
                                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <br /><br />

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center" >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Create an Account
                        </h2>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-gray-800 py-8 px-6 shadow-xl sm:rounded-lg sm:px-10 border border-gray-700">

                        {/* API Error Message */}
                        {apiError && (
                            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {apiError}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name}
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                required
                                disabled={isLoading}
                            />

                            <Input
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password_confirmation}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                required
                                disabled={isLoading}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}