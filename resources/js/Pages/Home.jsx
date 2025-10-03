import { Head, Link } from '@inertiajs/react'

export default function Home() {
    return (
        <>
            <Head>
                <title>Urban Hub Blogs - Share Your Urban Stories</title>
                <meta name="description" content="Join our community of urban storytellers and share your city experiences with the world." />
            </Head>

            {/* Main Container */}
            <div className="min-h-screen bg-gray-900 text-white">
                
                {/* Navigation */}
                <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    UrbanHub
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Blogs
                                </Link>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    About
                                </Link>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Contact
                                </Link>
                                <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black py-20 lg:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Share Your{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Urban Stories
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of writers sharing their city experiences, urban adventures, 
                            and metropolitan insights with a global community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                            <Link 
                                href="/register" 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Start Writing Today
                            </Link>
                            <Link 
                                href="/blogs" 
                                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-400 hover:text-white transition-all duration-200 hover:bg-gray-800"
                            >
                                Explore Stories
                            </Link>
                        </div>
                    </div>
                    
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Why Join UrbanHub?
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Everything you need to share your urban experiences and connect with like-minded storytellers.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gray-750 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold mb-3">Easy Publishing</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Write and publish your urban stories with our intuitive, distraction-free editor designed for writers.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gray-750 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold mb-3">Engaged Community</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Connect with urban enthusiasts, city explorers, and fellow writers who share your passion for metropolitan life.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gray-750 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="text-4xl mb-4">📈</div>
                                <h3 className="text-xl font-semibold mb-3">Grow Your Audience</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Reach thousands of readers interested in authentic urban stories and city experiences from around the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">10K+</div>
                                <div className="text-gray-400 text-lg">Active Writers</div>
                            </div>
                            <div className="p-6">
                                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">50K+</div>
                                <div className="text-gray-400 text-lg">Urban Stories</div>
                            </div>
                            <div className="p-6">
                                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">1M+</div>
                                <div className="text-gray-400 text-lg">Monthly Readers</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Share Your Urban Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join our community of urban storytellers and start sharing your city experiences today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/register" 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                            >
                                Create Your Account
                            </Link>
                            <Link 
                                href="/about" 
                                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-400 hover:text-white transition-all duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 border-t border-gray-700 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            {/* Brand */}
                            <div className="md:col-span-1">
                                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    UrbanHub
                                </Link>
                                <p className="text-gray-400 mt-4 leading-relaxed">
                                    Your platform for sharing urban stories and connecting with city enthusiasts worldwide.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Explore</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Top Writers</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-500 text-sm">
                                © 2024 UrbanHub Blogs. All rights reserved.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}