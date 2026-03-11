import Link from 'next/link';
import React from 'react'

function SocialCard() {
    return (
        <section className="px-6 md:px-12 lg:px-20 mt-20">
            <div className="max-w-6xl mx-auto text-center mb-20">
                <h1 className="text-2xl md:text-3xl font-semibold mb-18">
                Creating Social Content Shouldn't Be This Hard
                </h1>

                {/* Pain Points */}
                <div className="flex flex-col items-center gap-2 mb-20">
                <div className="bg-slate-100 text-slate-800 px-18 py-8 rounded-lg shadow-lg transform -rotate-3 max-w-xl border-2 border-slate-800">
                    <p className="text-lg font-medium">
                    Too many steps to create a single piece of content
                    </p>
                </div>

                <div className="bg-slate-100 text-slate-800 px-26 py-8 rounded-lg shadow-lg  transform rotate-2  max-w-xl border-2 border-slate-800">
                    <p className="text-lg font-medium">
                    No clear system to plan your content ideas
                    </p>
                </div>

                <div className="bg-slate-100 text-slate-800 px-15 py-8 rounded-lg shadow-lg  transform -rotate-3  max-w-xl border-2 border-slate-800">
                    <p className="text-lg font-medium">
                    Turning ideas into content takes longer than it should
                    </p>
                </div>
                </div>

                {/* Solution */}
                <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">
                    That's why we built{" "}
                    <span className="text-amber-400">Meujam Studio</span>
                </h2>
                <p className="text-slate-400 text-lg">
                    One place to manage your entire content pipeline
                </p>
                </div>

                {/* CTA Button */}
                <Link
                href="/signup"
                className="inline-block bg-amber-400 hover:bg-gray-300 cursor-pointer duration-75 text-slate-900 font-semibold px-10 py-3 rounded-2xl transition-colors"
                >
                Try for free
                </Link>
            </div>
        </section>
    );
}

export default SocialCard
