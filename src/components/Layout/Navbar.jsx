import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false); // scrolling down → hide
            } else {
                setShowNavbar(true); // scrolling up → show
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full bg-blue-900/90 backdrop-blur-md text-white shadow-lg z-20 transform transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center font-bold text-2xl tracking-wide">
                        <span className="text-blue-200">Ved</span>
                        <span className="text-white">EMR</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium transition duration-300">
                        {["Home", "Services", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="p-2 rounded rounded-2xl hover:bg-blue-200 relative group overflow-hidden"
                            >
                                <span className="transition-colors duration-300 group-hover:text-blue-300  rounded rounded-lg ">
                                    {item}
                                </span>
                                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <button className="relative px-6 py-2 font-medium bg-gradient-to-r from-blue-600 to-blue-500 rounded-full overflow-hidden group">
                            <span className="absolute inset-0 bg-blue-700 transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
                            <span className="relative z-10 text-white">Get Started</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 transition-transform duration-300 transform rotate-90" />
                            ) : (
                                <Menu className="h-6 w-6 transition-transform duration-300" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-blue-800 text-white px-4 py-3 space-y-2 animate-slideDown">
                    {["Home", "Services", "About", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="block hover:text-blue-300 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-medium transition">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
