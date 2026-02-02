import AuthForm from '@/components/auth/AuthForm'
import React from 'react'
import Image from 'next/image'

const Login = () => {
    return (
        <>
        {/* main container */}
        <div className="w-full flex items-center justify-evenly font-sans">
            {/* container for image and form */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-32 items-center p-8 md:p-12 rounded-[40px] relative">
                
                {/* Left Side: for image */}
                <div className="flex flex-col space-y-8 z-10 m-auto md:mt-0">
                    <div className="hidden md:block">
                        <h1 className="text-4xl  font-semibold tracking-tight">Studio</h1>
                        <p className="text-xl mt-1">Turn ideas into motion</p>
                    </div>

                    {/* Mobile Title */}
                    <h2 className="text-4xl font-semibold mb-4 text-center md:hidden">
                        Welcome back!
                    </h2>
                    
                    <div className="relative w-full max-w-md aspect-square flex items-center justify-center flex-wrap rounded-full">
                        {/*  for background blur effect */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#306C96]/80 to-[#306C96]/50 blur-3xl hidden md:block" />
                        <Image
                            src="/authPic.svg"
                            alt="Next.js logo"
                            width={100}
                            height={20}
                            priority
                            className="w-full h-auto object-contain relative z-10"
                        />
                    </div>
                </div>

                {/* Right Side: for form */}
                <div className="bg-transparent flex flex-col justify-center max-w-md mx-auto w-full md:mb-14 z-10">
                    {/* Desktop Title */}
                    <h2 className="text-4xl font-semibold mb-8 hidden md:block">Welcome back!</h2>
                    <AuthForm mode="login" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;

