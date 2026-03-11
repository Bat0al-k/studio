"use client";

import { useState } from "react";
import {
    FaLayerGroup,
    FaVolumeUp,
    FaPalette,
    FaMagic,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type Feature = {
    id: number;
    title: string;
    description: string;
    icon: IconType;
    tags: string[];
};

const features: Feature[] = [
    {
        id: 1,
        title: "Multi-Track Timeline",
        description:
        "Full control over your video with separate tracks for video, text, sound effects, and music. Organize your ideas with professional precision.",
        icon: FaLayerGroup,
        tags: ["Split & Trim", "Drag & Drop"],
    },
    {
        id: 2,
        title: "Audio Transitions",
        description:
        "Create smooth fades and seamless audio flow between clips with simple, intuitive controls built for fast editing.",
        icon: FaVolumeUp,
        tags: ["Fade In/Out", "Crossfade"],
    },
    {
        id: 3,
        title: "Color Grading",
        description:
        "Enhance every frame with cinematic color tools that help you give your videos a polished, professional look.",
        icon: FaPalette,
        tags: ["LUT Support", "Tone Control"],
    },
    {
        id: 4,
        title: "AI Effects",
        description:
        "Use smart effects and automatic enhancements to speed up your workflow and create better visuals effortlessly.",
        icon: FaMagic,
        tags: ["Smart Filters", "Auto Enhance"],
    },
    {
        id: 5,
        title: "Scene Management",
        description:
        "Keep your workflow organized with easy scene arrangement and fast access to all parts of your project.",
        icon: FaLayerGroup,
        tags: ["Fast Access", "Organized Flow"],
    },
    {
        id: 6,
        title: "Creative Control",
        description:
        "Fine-tune every part of your content with flexible controls built for creators who want more freedom.",
        icon: FaMagic,
        tags: ["Flexible Tools", "Precise Editing"],
    },
];

type FeatureCardProps = {
    feature: Feature;
    isActive: boolean;
    isCompact?: boolean;
    onClick: () => void;
};

function FeatureCard({
    feature,
    isActive,
    isCompact = false,
    onClick,
}: FeatureCardProps) {
    const Icon = feature.icon;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-[30px] bg-[#e7e7e7] text-left px-4 md:px-6 transition-all duration-300 hover:scale-[1.01]
                ${isCompact ? "py-4" : "py-6"}
                ${isActive ? "shadow-[0_20px_60px_rgba(0,0,0,0.18)]" : "shadow-none"}
            `}
            >
            <div className="flex items-start gap-4 cursor-pointer">
                <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2f4a] text-white">
                <Icon size={16} />
                </div>

                <div className="flex-1 md:text-lg">
                <h3
                    className={`font-semibold text-[#0b2f4a] leading-tight ${
                    isCompact ? "text-lg" : "text-lg "
                    }`}
                >
                    {feature.title}
                </h3>

                <div className="mt-8 flex flex-wrap gap-3">
                    {feature.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[#0b2f4a] px-2 py-1 text-sm md:text-base text-white"
                    >
                        {tag}
                    </span>
                    ))}
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
                    }`}
                >
                    <p className="max-w-xl text-base md:text-[18px] leading-relaxed text-[#637a8d]">
                    {feature.description}
                    </p>
                </div>
                </div>
            </div>
        </button>
    );
}

export function Features() {
    const [activeId, setActiveId] = useState<number>();

    const handleCardClick = (id: number) => {
        setActiveId((prev) => (prev === id ? 0 : id));
    };

    const leftColumn = [features[0], features[3]];
    const centerTop = features[1];
    const centerBottom = features[4];
    const rightColumn = [features[2], features[5]];

    return (
        <section className="px-6 py-16 md:px-10 lg:px-16">


        <div className="relative mx-auto max-w-6xl">
            <div className="mb-14 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
                Our Features
            </h2>
            </div>

            {/* Mobile / Tablet */}
            <div className="grid grid-cols-1 gap-5 lg:hidden">
            {features.map((feature) => (
                <FeatureCard
                key={feature.id}
                feature={feature}
                isActive={activeId === feature.id}
                onClick={() => handleCardClick(feature.id)}
                />
            ))}
            </div>

            {/* Desktop layout like the image */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-7 lg:items-start">
            {/* Left column */}
            <div className="flex flex-col gap-7 pt-10">
                {leftColumn.map((feature) => (
                <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isActive={activeId === feature.id}
                    onClick={() => handleCardClick(feature.id)}
                />
                ))}
            </div>

            {/* Center column */}
            <div className="flex flex-col gap-8 pt-10">
                <FeatureCard
                feature={centerTop}
                isActive={activeId === centerTop.id}
                onClick={() => handleCardClick(centerTop.id)}
                />

                <FeatureCard
                feature={centerBottom}
                isActive={activeId === centerBottom.id}
                isCompact
                onClick={() => handleCardClick(centerBottom.id)}
                />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-7 pt-10">
                {rightColumn.map((feature) => (
                <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isActive={activeId === feature.id}
                    onClick={() => handleCardClick(feature.id)}
                />
                ))}
            </div>
            </div>
        </div>
        </section>
    );
}