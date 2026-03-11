"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    FaStar,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Lorem Ipsum",
        role: "Content Creator",
        text: "Donec auctor ligula sit amet mauris tincidunt, et viverra libero congue. Morbi vehicula interdum felis, non euismod felis auctor non.",
        avatar: "/avatarM.svg",
    },
    {
        id: 2,
        name: "Sarah Lee",
        role: "Marketing Lead",
        text: "This platform made our workflow much faster. We can plan, edit, and publish content without jumping between tools all day.",
        avatar: "/avatarM.svg",
    },
    {
        id: 3,
        name: "James Carter",
        role: "Video Editor",
        text: "The editing experience feels simple but powerful. It helped me deliver polished content in less time.",
        avatar: "/avatarM.svg",
    },
    {
        id: 4,
        name: "Nina Rose",
        role: "Brand Manager",
        text: "Our team now has a much clearer process. The interface is clean, and collaboration feels natural.",
        avatar: "/avatarM.svg",
    },
    {
        id: 5,
        name: "Omar Khaled",
        role: "Founder",
        text: "We were looking for speed and consistency. This solved both problems for our content pipeline.",
        avatar: "/avatarM.svg",
    },
    {
        id: 6,
        name: "Emily Stone",
        role: "Social Media Manager",
        text: "Publishing content used to feel messy. Now everything is organized and much easier to manage.",
        avatar: "/avatarM.svg",
    },
];

const getSlidesPerView = (width: number) => {
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
};

export function ClientsReview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [isPaused, setIsPaused] = useState(false);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const handleResize = () => {
        const newSlidesPerView = getSlidesPerView(window.innerWidth);
        setSlidesPerView(newSlidesPerView);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, reviews.length - slidesPerView);
    const totalDots = maxIndex + 1;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
        nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, maxIndex]);

    useEffect(() => {
        if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
    };

  const translatePercentage = (100 / slidesPerView) * currentIndex;

    return (
        <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto my-32">
            <h2 className="text-3xl font-semibold text-center mb-16">
            What Our Clients Are Saying
            </h2>

            <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            >
            <div
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${translatePercentage}%)`,
                }}
                >
                {reviews.map((review) => (
                    <div
                    key={review.id}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 pt-6"
                    >
                    <div className="bg-white rounded-lg p-5 relative h-full min-h-[170px] flex flex-col justify-between">
                    
                    <div>
                        <div className="absolute -top-6 left-4">
                        <Image
                            src={review.avatar}
                            width={48}
                            height={48}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        </div>

                        <div className="flex justify-end mb-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-3 h-3 text-amber-400" />
                            ))}
                        </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                        {review.text}
                        </p>
                    </div>

                    {/* Bottom section */}
                    <div className='border-t pt-2'> 
                        <p className="text-slate-800 font-semibold text-sm">
                        {review.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                        {review.role}
                        </p>
                    </div>

                    </div>
                    </div>
                ))}
                </div>
            </div>

            <button
                type="button"
                onClick={prevSlide}
                className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-md hover:bg-slate-100 transition-colors"
                aria-label="Previous reviews"
            >
                <FaChevronLeft size={14} />
            </button>

            <button
                type="button"
                onClick={nextSlide}
                className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-md hover:bg-slate-100 transition-colors"
                aria-label="Next reviews"
            >
                <FaChevronRight size={14} />
            </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, i) => (
                <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                    currentIndex === i
                    ? "w-6 bg-amber-400"
                    : "w-2 bg-slate-500 hover:bg-slate-400"
                }`}
                aria-label={`Go to review group ${i + 1}`}
                />
            ))}
            </div>
        </div>
        </section>
    );
}