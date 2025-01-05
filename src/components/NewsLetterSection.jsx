import React from "react";

const NewsletterSection = () => {
    return (
        <div className="bg-gradient-to-r from-[#19284a] to-[#33526d] py-16 px-6">
            <div className="container mx-auto max-w-4xl text-center text-white">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-4">
                    Stay Updated with the Latest Movies
                </h2>
                <p className="text-gray-300 mb-8">
                    Subscribe to our newsletter and get updates on the latest releases, trending movies, and exclusive offers directly in your inbox!
                </p>

                {/* Newsletter Form */}
                <form
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full sm:w-2/3 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500 transition-all duration-300"
                    />

                    {/* Subscribe Button */}
                    <button
                        type="submit"
                        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 shadow-md transition-transform transform hover:scale-105"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Footer Text */}
                <p className="text-sm text-gray-400 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
};

export default NewsletterSection;
