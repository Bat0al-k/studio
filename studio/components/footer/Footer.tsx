import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const footerLinks: Record<string, { label: string; href: string }[]> = {
Product: [
{ label: "Features", href: "/features" },
{ label: "Templates", href: "/templates" },
{ label: "Pricing", href: "/pricing" },
{ label: "Changelog", href: "/changelog" },
],
Company: [
{ label: "About", href: "/about" },
{ label: "Blog", href: "/blog" },
{ label: "Careers", href: "/careers" },
{ label: "Press", href: "/press" },
],
Resources: [
{ label: "Documentation", href: "/docs" },
{ label: "Help Center", href: "/help" },
{ label: "Community", href: "/community" },
{ label: "Contact", href: "/contact" },
],
Legal: [
{ label: "Privacy", href: "/privacy" },
{ label: "Terms", href: "/terms" },
{ label: "Cookie Policy", href: "/cookies" },
{ label: "Licenses", href: "/licenses" },
],
};

const Footer = () => {
    return (
    <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-gray-400 w-full">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-35">
            {/* Logo & Social */}
            <div className="col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="Logo" width={20} height={20} />
                <span className="font-semibold text-lg">Muejam</span>
                </Link>

                <p className="text-gray-400 text-sm mb-4 max-w-xs">
                The all-in-one platform for video creators and storytellers.
                </p>

                <div className="flex items-center gap-3">
                {/* External links: use <a> (not Link) */}
                <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Twitter"
                >
                    <FaTwitter size={16} />
                </Link>

                <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                >
                    <FaInstagram size={16} />
                </Link>

                <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="YouTube"
                >
                    <FaYoutube size={16} />
                </Link>

                <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={16} />
                </Link>
                </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                <h4 className="text-sm font-medium mb-3">{title}</h4>
                <ul className="space-y-2">
                    {links.map((item) => (
                    <li key={item.href}>
                        <Link
                        href={item.href}
                        className="text-gray-400 text-sm hover:text-white transition-colors"
                        >
                        {item.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Muejam. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
                <Link
                href="/privacy"
                className="text-gray-400 text-sm hover:text-gray-400 transition-colors"
                >
                Privacy Policy
                </Link>
                <Link
                href="/terms"
                className="text-gray-400 text-sm hover:text-gray-400 transition-colors"
                >
                Terms of Service
                </Link>
            </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer
