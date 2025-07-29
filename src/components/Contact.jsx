import { Button } from "@mui/material";
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact=()=>{
    return (
        <div className="flex flex-col items-center justify-center 
        min-h-screen py-12 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')" }}>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">
                    Contact Us
                </h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! If you have any questions, comments, or feedback, please reach out to us using the form below.
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input type="text" 
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg
                            p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input type="email" 
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg
                            p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            rows="4"
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg
                            p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <Button className="w-full" variant="contained" color="primary">
                        Send Message
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaPhone className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">+1 314 756 3254</span>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">info@example.com</span>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarkedAlt className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">123 Main St, Anytown, USA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;