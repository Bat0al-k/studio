import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const contentItems = [
    {
        id: 1,
        title: "Content creators",
        description:
        "Create engaging content for your audience with our powerful editing tools.",
        image: "https://csspicker.dev/api/image/?q=person+working+laptop&image_type=photo",
    },
    {
        id: 2,
        title: "Content creators",
        description:
        "Streamline your workflow and produce high-quality videos faster than ever before.",
        image: "https://csspicker.dev/api/image/?q=creative+person+smiling&image_type=photo",
    },
    {
        id: 3,
        title: "Content creators",
        description: "Professional-grade tools designed for creators who demand the best.",
        image: null,
    },
    {
        id: 4,
        title: "Content creators",
        description: "Join thousands of creators who trust our platform for their content needs.",
        image: null,
    },
] as const;

function ExploreLink() {
    return (
        <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-200  text-decoration-line: underline underline-offset-4 text-sm hover:text-blue-300 transition-colors"
        >
        Explore more
        <FaArrowRight size={14} />
        </Link>
    );
    }

    function ImageCard({ src }: { src: string }) {
    return (
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800">
        <Image
            src={src}
            alt="Creator"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
    );
    }

    function TextCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-gray-800/40 border border-gray-200 rounded-2xl p-6 flex flex-col justify-center">
        <h3 className="text-white font-semibold mb-2 text-lg">{title}</h3>
        <p className="text-gray-400 leading-relaxed mb-4">{description}</p>
        <ExploreLink />
        </div>
    );
    }

    export function ContentEngine() {
    return (
        <>
            <section className="py-12 px-6 md:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto mt-28">
                {/* Section Header */}
                <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                    One content engine. Built for every creator
                </h2>
                <p className="text-gray-500 text-lg">
                    From solo creators to enterprise teams, we have got you covered
                </p>
                </div>

                {/* Content Grid */}
                <div className="space-y-4">
                {/* Row 1: Image Left + Text Right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentItems[0].image ? <ImageCard src={contentItems[0].image} /> : null}
                    <div className="grid gap-1.5">
                        <TextCard
                        title={contentItems[2].title}
                        description={contentItems[2].description}
                        />
                        <TextCard
                        title={contentItems[1].title}
                        description={contentItems[1].description}
                        />
                    </div>
                </div>

                {/* Row 2: Text Left + Image Right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                        <TextCard
                        title={contentItems[3].title}
                        description={contentItems[3].description}
                        />
                        <TextCard
                        title={contentItems[0].title}
                        description={contentItems[0].description}
                        />
                    </div>
                    {contentItems[1].image ? <ImageCard src={contentItems[1].image} /> : null}
                </div>

                {/* Row 3: Two Text Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextCard
                    title={contentItems[2].title}
                    description={contentItems[2].description}
                    />
                    <TextCard
                    title={contentItems[3].title}
                    description={contentItems[3].description}
                    />
                </div> */}
                </div>
            </div>
            </section>
            <div className="text-center mb-22 mt-10">
                <p className="text-slate-100 text-2xl mb-4">
                New to video editing?
                </p>

                <p className="text-slate-100 text-xl mb-4">
                Start simple — and grow as your skills grow.
                </p>

                <Link
                href="/signup"
                className="inline-block bg-amber-400 hover:bg-gray-300 transition-colors cursor-pointer duration-75  text-slate-900 font-semibold px-10 py-3 rounded-2xl mt-4"
                >
                Try for free
                </Link>
            </div>
        </>
    );
}