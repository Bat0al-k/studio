"use client";
import React from 'react'
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from 'next/link';

const faqs = [
    {
        question: "Can I use Spline for free?",
        answer:
        "Yes, naturally! The basic plan is free. You can create unlimited personal files and use the viewer, however, if you want to export or embed projects, you will need a paid plan.",
    },
    { question: "Why should I upgrade to Super or Super Team?" },
    { question: "What payment methods can I use?" },
    { question: "How does team billing work?" },
    { question: "How can I cancel my subscription?" },
    { question: "Can I change from monthly to yearly?" },
    { question: "How can I ask other questions about pricing?" },
    { question: "Interested in Spline for Education?" },
];
export const FAQQuestion=()=>{
    const [openIndex, setOpenIndex] = useState(0);
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
    return (
        <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-semibold text-center mb-8">
            Frequently Asked Questions
            </h2>

            <div className="space-y-3">
            {faqs.map((faq, index) => {
                const expanded = openIndex === index;

                return (
                <div
                    key={index}
                    className={`rounded-lg overflow-hidden ${
                    expanded ? "bg-slate-800/30" : "bg-slate-800/50"
                    } p-2`}
                >
                    <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                    >
                    <span className="font-medium text-slate-200">
                        {faq.question}
                    </span>

                    <FaChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                        expanded ? "rotate-180" : ""
                        }`}
                    />
                    </button>

                    {expanded && faq.answer && (
                    <div className="px-4 pb-4">
                        <p className="text-slate-400 text-sm leading-relaxed">
                        {faq.answer}
                        </p>
                    </div>
                    )}
                </div>
                );
            })}
            </div>
            <div className="text-center px-6 md:px-12 lg:px-20 mt-26">
                <h2 className="text-3xl font-semibold mb-5">
                Start creating content in minutes!
                </h2>

                <p className="text-slate-400 text-lg mb-6">
                From idea to publishing — everything you need to create better content faster.
                </p>

                <Link
                    href="/signup"
                    className="inline-block bg-amber-400 hover:bg-gray-300 text-slate-900 font-semibold px-14 py-3 rounded-2xl transition-colors cursor-pointer duration-75"
                    >
                    Try for free
                </Link>
            </div>
        </div>
        </section>
    );
}

export default FAQQuestion
