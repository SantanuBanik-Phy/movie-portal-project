import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    //TODO:In production, you would send the form data to a server here
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f1e36] to-[#2d3e57] text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
          Contact Us
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Have questions, feedback, or just want to connect with us? Drop us a
          message, and our team will get back to you as soon as possible.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
          {/* Contact Form */}
          <form
            className="bg-[#1a2b48] p-8 rounded-lg shadow-lg w-full lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-300 font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-300 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-300 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-black rounded-lg font-medium text-lg transition-all hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-600"
            >
              Send Message
            </button>
            {formSubmitted && (
              <p className="mt-4 text-center text-green-400">
                Thank you for reaching out! We'll get back to you soon.
              </p>
            )}
          </form>

          {/* Contact Information */}
          <div className="mt-12 lg:mt-0 w-full lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6">
              Reach us at our headquarters or through our social media channels.
            </p>
            <div className="space-y-4">
              <p className="flex items-center space-x-4">
                <span className="text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8c0-2.21-1.79-4-4-4S8 5.79 8 8m6 0a6 6 0 11-6-6 6 6 0 016 6zm2 4h3M7 12H4m4 5H2m16-5h2m-3 5h4m-6-3c1.654-1.854 4-5 4-7a6 6 0 10-12 0c0 2 2.346 5.146 4 7z"
                    />
                  </svg>
                </span>
                <span>123 Movie Lane, Film City, CA</span>
              </p>
              <p className="flex items-center space-x-4">
                <span className="text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 2a6 6 0 016 6v4c0 1.656-.672 3.156-1.757 4.243C18.156 18.328 16.656 19 15 19H9c-1.656 0-3.156-.672-4.243-1.757C3.672 15.156 3 13.656 3 12V8c0-1.656.672-3.156 1.757-4.243C5.844 2.672 7.344 2 9 2h6z"
                    />
                  </svg>
                </span>
                <span>support@movieportal.com</span>
              </p>
              <p className="flex items-center space-x-4">
                <span className="text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h11m7 0h1m-9-6v1m9 15v1m-4-9v2m4-2v2m4-6v2m0 4v2"
                    />
                  </svg>
                </span>
                <span>01817533313</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
