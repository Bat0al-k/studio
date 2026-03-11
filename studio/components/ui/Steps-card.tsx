import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function StepsCard() {
  return (
    <section className="px-6 md:px-12 lg:px-20 mt-45">
      <div className="max-w-5xl mx-auto ">
        <h2 className="text-4xl font-semibold text-center mt-20">
          Create content with 3 simple steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {/* Step 1 */}
          <div className="bg-slate-800/50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold mb-2 text-lg">1 - Describe your idea</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              imperdiet quam fringilla
            </p>

            <div className="rounded-lg overflow-hidden">
              <Image
                src="/rhythm.svg"
                width={20}
                height={20}
                alt="Wave visualization"
                className="w-full h-24 object-contain"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold mb-2 text-lg">
              2 - AI Generates content
            </h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              imperdiet quam fringilla
            </p>

            <div className="rounded-lg overflow-hidden">
              <Image
                src="/rhythm.svg"
                width={20}
                height={20}
                alt="Wave visualization"
                className="w-full h-24 object-contain"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/50 border border-slate-200 rounded-xl p-5 md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">
                  3 - Edit & Publish
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  imperdiet quam fringilla
                </p>

                <Link
                  href="/signup"
                  className="inline-block bg-amber-400 hover:bg-gray-300 cursor-pointer duration-75 text-slate-900 font-semibold px-10 py-3 rounded-2xl transition-colors"
                >
                  Try for free
                </Link>
              </div>

              <div className="rounded-lg overflow-hidden md:w-76">
                <Image
                src="/rhythm.svg"
                width={22}
                height={22}
                alt="Wave visualization"
                className="w-full h-30 object-contain"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StepsCard
