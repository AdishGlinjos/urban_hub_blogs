import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary',
    ...props 
}) => {
    const baseClasses = "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
    
    const variants = {
        primary: "text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 transform hover:scale-105 shadow-lg",
        secondary: "text-gray-300 border border-gray-600 hover:border-blue-400 hover:text-white hover:bg-gray-700"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;