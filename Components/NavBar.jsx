"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../Assets/logo.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // for mobile expand/collapse

    const services = ["Web Design", "Mobile Application", "Website Development", "Graphic Designing", "Profile Designing", "Logo Design", "Web Hosting", "Social Media", "Domain Registeration", "Web Maintainence", "E-Commerce", "SEO Services"];
    const portfolio = ["Website Designing", "Logo Designing", "Profile Designing", "Graphics Designing"];
    const blogs = ["Our Mission", "Our Vision", "Our Team", "Our Approach"];

    return (
        <div className="top-0 left-0 md:right-0 z-20 flex justify-center">
            {/* Navbar container */}
            <div className="flex items-center justify-between w-full max-w-7xl px-4 py-3 backdrop-blur-md text-white mt-4 mx-2 md:mx-24 rounded-2xl bg-gray-400 gap-32 md:gap-0">
                {/* Left - Logo */}
                <div className="flex items-center">
                    <Image src={Logo} alt="HubSol Logo" width={150} height={40} />
                </div>

                {/* Center - Links (Desktop) */}
                <div className="flex-1 hidden md:flex justify-center">
                    <ul className="flex space-x-8 text-lg font-medium relative">
                        <a href="/">
                            <li className="cursor-pointer hover:text-blue-400 font-bold">Home</li>
                        </a>
                        <a href="/About">
                            <li className="relative group cursor-pointer">
                                About Us
                            </li>
                        </a>

                        {/* Services Dropdown */}
                        <li className="relative group cursor-pointer">

                            <div className="flex items-center hover:text-blue-400 font-bold">
                                <a href="/Services">
                                    Our Services
                                </a>
                                {/* Our Services <ChevronDown size={18} className="ml-1" /> */}
                            </div>

                            {/* Dropdown */}
                            {/* <ul className="absolute left-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg py-2 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                     transition duration-200">
                                {services.map((item) => (
                                    <li
                                        key={item}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul> */}
                        </li>

                        {/* Portfolio Dropdown */}
                        <a href="/SubCompany">
                            <li className="relative group cursor-pointer">
                                Sub Company
                                {/* <div className="flex items-center hover:text-blue-400 font-bold"> */}
                                {/* Portfolio */}
                                {/* Portfolio <ChevronDown size={16} className="ml-1" /> */}
                                {/* </div> */}
                                {/* <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                     transition duration-200">
                                {portfolio.map((item) => (
                                    <li
                                        key={item}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul> */}
                            </li>
                        </a>

                        <a href="/Academy">
                            <li className="cursor-pointer hover:text-blue-400 font-bold">Academy</li>
                        </a>
                        <a href="/Career">
                            <li className="cursor-pointer hover:text-blue-400 font-bold">Career</li>
                        </a>
                        <a href="/Contact">
                            <li className="cursor-pointer hover:text-blue-400 font-bold">Contact Us</li>

                        </a>
                    </ul>
                </div>


                {/* Right - Button */}
                <div className="hidden md:block">
                    {/* Gradient background */}
                    <button className="bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                        GET A QUOTE
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden ml-auto">
                    <button onClick={() => setIsOpen(true)}>
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Side Menu (Mobile) */}
            {isOpen && (
                <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 transition-transform">
                    {/* Close Button */}
                    <button className="self-end mb-6" onClick={() => setIsOpen(false)}>
                        <X size={28} />
                    </button>

                    {/* Mobile Links */}
                    <ul className="flex flex-col space-y-6 text-lg font-medium text-black">
                        <a href="/">
                            <li onClick={() => setIsOpen(false)}>Home</li>
                        </a>
                        <a href="/About">
                            <li onClick={() => setIsOpen(false)}>About Us</li>
                        </a>
                        {/* Services Dropdown */}
                        <a href="/Services">
                            <li onClick={() => setIsOpen(false)}>Our Services</li>
                        </a>
                        <a href="/SubCompany">
                            <li onClick={() => setIsOpen(false)}>Sub Company</li>
                        </a>
                        <a href="/Academy">
                            <li onClick={() => setIsOpen(false)}>Academy</li>   
                        </a>
                        <a href="/Career">
                            <li onClick={() => setIsOpen(false)}>Career</li>
                        </a>
                        <a href="/Contact">
                            <li onClick={() => setIsOpen(false)}>Contact Us</li>
                        </a>
                    </ul>

                    {/* Button at bottom */}
                    <div className="mt-auto">
                        <button className="w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                            GET A QUOTE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
