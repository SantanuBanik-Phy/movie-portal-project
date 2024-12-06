import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const AboutUs = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const scaleHover = {
        whileHover: { scale: 1.05 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="container mx-auto p-6 my-12"
        >
            {/* Hero Section */}
            <motion.div
                variants={fadeInUp}
                className="hero bg-gradient-to-r from-[#17264b] to-[#456f94] rounded-xl text-white shadow-xl mb-12"
            >
                <div className="hero-content p-8 flex-col lg:flex-row items-center">
                    <motion.img
                        src={logo}
                        className="max-w-xs pl-6 rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
                        alt="Movie Portal Logo"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="lg:ml-8 p-4 text-center lg:text-left">
                        <h1 className="text-4xl font-bold  text-yellow-500 mb-4">About Movie Portal</h1>
                        <p className="text-lg leading-relaxed mb-4">
                            Your one-stop destination for everything movies! From timeless classics to the latest blockbusters, 
                            we are dedicated to bringing you an unmatched movie experience.
                        </p>
                        <motion.a
                            href="#contact"
                            className="btn btn-outline btn-light bg-white hover:text-blue-500 mt-4 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            Get in Touch
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div variants={fadeInUp} className="bg-gray-100 rounded-xl shadow-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                    At Movie Portal, we're passionate about film and committed to delivering a seamless and enjoyable experience 
                    for movie enthusiasts like you. Whether you're diving into the classics or exploring the latest releases, 
                    our mission is to make your journey memorable.
                </p>
            </motion.div>

            {/* Our Values */}
            <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="text-3xl font-bold text-center  text-yellow-500 mb-6">Our Values</h2>
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {["Vast Selection", "User-Friendly", "Personalized"].map((value, index) => (
                        <motion.div
                            key={index}
                            className="group card bg-white shadow-xl"
                            whileHover="whileHover"
                            variants={scaleHover}
                        >
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className={`text-blue-900 text-4xl ${
                                        index === 0
                                            ? "fas fa-film"
                                            : index === 1
                                            ? "fas fa-user-friends"
                                            : "fas fa-heart"
                                    }`}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{value}</h3>
                                <p className="text-gray-600">
                                    {index === 0
                                        ? "Explore a wide variety of movies tailored to every taste and preference."
                                        : index === 1
                                        ? "Experience an intuitive and seamless platform designed for ease of use."
                                        : "Get movie recommendations and features customized just for you."}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Contact Us */}
            <motion.div
                variants={fadeInUp}
                id="contact"
                className="bg-gradient-to-l from-[#17264b] to-[#456f94]  text-white rounded-xl shadow-lg p-8"
            >
                <h2 className="text-3xl font-bold text-center  text-yellow-500 mb-6">Contact Us</h2>
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        { title: "Email", content: "support@movieportal.com", type: "email" },
                        { title: "Phone", content: "+880182398472", type: "phone" },
                        { title: "Address", content: " 296/1,South Shadebpur,Feni,Dhaka,Bangladesh", type: "address" },
                    ].map((contact, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                            {contact.type === "email" ? (
                                <a
                                    href={`mailto:${contact.content}`}
                                    className="text-blue-400 hover:text-blue-500 transition-all duration-300"
                                >
                                    {contact.content}
                                </a>
                            ) : (
                                <p className="text-gray-300">{contact.content}</p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AboutUs;
