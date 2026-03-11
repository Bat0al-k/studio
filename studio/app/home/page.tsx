// app/home/page.tsx

import React from 'react'
import Image from 'next/image'
import { Features } from '@/components/ui/Feature-card'
import { ContentEngine } from '@/components/ui/Content-creator-card'
import { FaPlay} from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import SocialCard from '@/components/ui/Social-content-card';
import StepsCard from '@/components/ui/Steps-card';
import {ClientsReview} from '@/components/ui/Clients-review';
import {FAQQuestion} from '@/components/ui/FAQ-question';

const HomePage = () => {
    return (
        <main className="relative min-h-screen overflow-hidden ">
            {/* top left glow */}
            <div className="pointer-events-none absolute bottom-[90%] -left-1 h-[420px] w-[420px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16)_65%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.03)_36%,transparent_70%)] blur-3xl" />
            {/* top right glow */}
            <div className="pointer-events-none absolute -top-22 -right-24 h-[440px] w-[440px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_35%,rgba(255,255,255,0.07)_20%,rgba(255,255,255,0.02)_40%,transparent_72%)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[78%] -right-28 h-[440px] w-[440px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_85%,rgba(255,255,255,0.07)_20%,rgba(255,255,255,0.02)_40%,transparent_72%)] blur-3xl" />
            {/* middle left glow */}
            <div className="pointer-events-none absolute top-[25%] -left-28 h-[460px] w-[460px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_60%,rgba(255,255,255,0.05)_22%,rgba(255,255,255,0.02)_42%,transparent_72%)] blur-3xl" />

            <div className="pointer-events-none absolute top-[46%] -left-28 h-[460px] w-[460px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_70%,rgba(255,255,255,0.05)_22%,rgba(255,255,255,0.02)_42%,transparent_72%)] blur-3xl" />

            {/* middle right glow */}
            <div className="pointer-events-none absolute top-[34%] -right-24 h-[460px] w-[460px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.05)_22%,rgba(255,255,255,0.02)_42%,transparent_72%)] blur-3xl" />

             {/* lower left glow */}
            <div className="pointer-events-none absolute top-[68%] -left-24 h-[440px] w-[440px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.02)_40%,transparent_72%)] blur-3xl" />

            {/* lower right glow */}
            <div className="pointer-events-none absolute bottom-[10%] -right-28 h-[460px] w-[460px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.05)_22%,rgba(255,255,255,0.02)_42%,transparent_72%)] blur-3xl" />

            {/* bottom left glow */}
            <div className="pointer-events-none absolute bottom-[-60px] -left-28 h-[420px] w-[420px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.07)_18%,rgba(255,255,255,0.03)_36%,transparent_72%)] blur-3xl" />


            <div className="relative z-10">
                    <section className="pt-16 pb-20 px-6 md:px-12 lg:px-20 ">
                    <div className="w-full mx-auto text-center mt-28">
                        <span className="text-gray-300 text-base md:text-xl">
                        Muejam Studio
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Turn ideas into{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-yellow-400">motion</span>
                            <WiStars className="absolute -top-4 -right-20 w-18 h-18 text-white" />
                        </span>
                        </h1>

                        <p className="text-gray-300 text-base md:text-3xl max-w-4xl mx-auto mb-10">
                        A system to plan, create, and publish content — all in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-10 py-3 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-colors cursor-pointer duration-75">
                            Try for free
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-3">
                            <Image
                                src="/avatar.svg"
                                width={40}
                                height={40}
                                alt="Users"
                                className="w-9 h-9 rounded-full border-2 border-[#0a0f1a] object-cover"
                            />
                            <Image
                                src="/avatarM.svg"
                                width={40}
                                height={40}
                                alt="Users"
                                className="w-9 h-9 rounded-full border-2 border-[#0a0f1a] object-cover"
                            />
                            <Image
                                src="/avatar.svg"
                                width={40}
                                height={40}
                                alt="Users"
                                className="w-9 h-9 rounded-full border-2 border-[#0a0f1a] object-cover"
                            />
                            <Image
                                src="/avatarM.svg"
                                width={40}
                                height={40}
                                alt="Users"
                                className="w-9 h-9 rounded-full border-2 border-[#0a0f1a] object-cover"
                            />
                            </div>

                            <span className="text-gray-400 text-sm">
                            Trusted by 10,000+ creators
                            </span>
                        </div>
                        </div>
                    </div>
                    </section>

                    <SocialCard />
                    <StepsCard />
                    <Features />
                    <ContentEngine />
                    <ClientsReview />
                    <FAQQuestion />
            </div>
        </main>
    );
};

export default HomePage;