'use client'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

type AuthMode = "login" | "signup"

interface AuthFormProps {
    mode: AuthMode
}

interface PasswordInputProps {
    label: string
    value: string
    onChange: (val: string) => void
}

const PasswordInput = ({ label, value, onChange }:PasswordInputProps) => {
    const [show, setShow] = useState(false)

    return (
        <div className="space-y-2">
            <label className="block text-[#0f2d44] font-bold text-lg">{label}</label>
            <div className="relative">
                <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#082D47] bg-white/80 backdrop-blur-sm transition-all"
                />
                <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
            </div>
        </div>
    )
}

const AuthForm = ({ mode }: AuthFormProps) => {

    const isSignup = mode === "signup"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <>
            <form className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                <label className="block text-[#0f2d44] font-bold text-lg">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#082D47] bg-white/80 backdrop-blur-sm transition-all"
                />
                </div>

                {/* Password & Confirm Password Fields */}
                <PasswordInput label="Password" value={password} onChange={setPassword} />
                {isSignup && (
                    <PasswordInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                    />
                )}

                {/* Remember Me + Forgot Password (Login Only) */}
                {!isSignup && (
                <div className="flex items-center justify-between text-sm">
                    
                    {/* Remember Me */}
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-[#082D47]"/>
                        Remember me
                    </label>

                    {/* Forgot Password */}
                    <Link href="/" className="text-[#082D47] font-semibold hover:underline">
                        Forgot password?
                    </Link>
                </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 space-y-4 flex flex-col gap-2 text-center">
                    <Link href="/" className="w-full bg-[#0a2540] text-white font-bold py-4 rounded-xl hover:bg-[#082D47B2] transition-colors shadow-lg">
                        {isSignup ? "Sign up" : "Login"}
                    </Link>

                    <Link href="/" className="w-full bg-white border border-gray-300 text-[#0a2540] hover:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#082D47B2] transition-colors shadow-lg">
                        {isSignup ? "Sign up with Google" : "Login with Google"} <FcGoogle size={20} />
                    </Link>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">

                {isSignup ? (
                    <>
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-[#0a2540] font-bold hover:underline">Login</Link>
                    </>
                ) : (
                    <>
                        Don’t have an account?{" "}
                        <Link href="/auth/signup" className="text-[#0a2540] font-bold hover:underline">Sign up</Link>
                    </>
                )}
            </div>
        </>
    )
}

export default AuthForm
