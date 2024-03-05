import { autocomplete } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";  // Import useState
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });  // State for form data

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if username and password are "admin"
        if (formData.username === 'admin' && formData.password === 'admin') {
            toast("Admin Login Successful", { type: "success", autoclose: 3000 });
            navigate("/dashboard/admin");
        } else {
            toast.error("Invalid username or password");
        }
    };

    // Update form data when inputs change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <section className="bg-gray-50 bg-cover">
                <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-bold text-[#eb2168] pt-8"
                    >
                        WandrLust
                    </a>
                    <div className="w-full max-w-md bg-white rounded-lg shadow-xl dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Admin Login
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                                        placeholder="Your username"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                                        required
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full text-white bg-[#eb2168] hover:bg-[#E02168] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />  {/* Add ToastContainer here for toast messages */}
        </div>
    );
};

export default Admin;
