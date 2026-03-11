"use client";
import React from 'react'
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import ThemeToggle from '../ThemeToggle';


const navItems = [
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "Verification", href: "/verification" },

];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full py-4 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={20} height={20} />
                <span className=" font-semibold text-lg">Muejam</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-35">
                {navItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-300 hover:text-white text-md font-medium transition-colors"
                    >
                    {item.label}
                    </Link>
                ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                <Link
                    href="/auth/login"
                    className="inline-flex bg-gray-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors hover:shadow-xl duration-300 gap-2 text-[#0a2540] focus:bg-sky-950 focus:text-white focus:border-gray-100 focus:border"
                >
                    Get Started

                </Link>
                </div>
                {/* <div className="md:block hidden">
                <ThemeToggle />
                </div> */}

                {/* Mobile Menu Button */}
                <button
                type="button"
                className="md:hidden text-white"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                id="mobile-menu"
                className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
                >
                <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="dark:hover:text-gray-600 hover:text-white text-sm font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.label}
                    </Link>
                    ))}

                    <Link
                    href="/auth/login"
                    className="inline-flex bg-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors w-fit hover:shadow-xl duration-300 gap-2 text-[#0a2540] focus:bg-sky-950 focus:text-white focus:border-gray-100 focus:border "
                    onClick={() => setIsOpen(false)}
                    >
                    Get Started
                    </Link>
                <ThemeToggle />
                </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar   

