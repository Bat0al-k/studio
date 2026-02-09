'use client'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useAuthForm, AuthMode, validateFieldOnBlur } from './useAuthForm'

interface AuthFormProps {
    mode: AuthMode
}

interface PasswordInputProps {
    label: string
    name: string
    value: string
    onChange: (val: string) => void
    error?: string
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const PasswordInput = ({
    label,
    name,
    value,
    onChange,
    error,
    setErrors,
    }: PasswordInputProps) => {
    const [show, setShow] = useState(false)

    return (
        <div className="space-y-2">
        <label className="block font-bold text-lg">{label}</label>

        <div className="relative">
            <input
            type={show ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => {
                const fieldError = validateFieldOnBlur(label, value)
                setErrors((prev) => ({
                ...prev,
                [name]: fieldError ?? '',
                }))
            }}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className={`w-full px-4 py-3 rounded-xl border ${
                error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-[#082D47] dark:focus:ring-[#306C96]'
            } focus:outline-none focus:ring-2 bg-white/80 backdrop-blur-sm transition-all text-[#0f2d44]`}
            />

            <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700"
            >
            {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        error,
        errors, setErrors,
        handleSubmit,
        isSignup
    } = useAuthForm(mode)

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                    <p className="p-3 text-red-700 text-sm text-center font-medium">
                        {error}
                    </p>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block font-bold text-lg">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => {
                            const error = validateFieldOnBlur('email', email)
                            if (error) {
                                setErrors((prev: any) => ({ ...prev, email: error }))
                            }
                        }}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-[#082D47] dark:focus:ring-[#306C96]'} focus:outline-none focus:ring-2 bg-white/80 backdrop-blur-sm transition-all text-[#0f2d44] `}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password & Confirm Password Fields */}
                <PasswordInput label="Password" name="password" value={password} onChange={setPassword} error={errors.password} setErrors={setErrors}/>
                {isSignup && (
                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        setErrors={setErrors}
                        error={errors.confirmPassword}
                    />
                )}

                {/* Remember Me + Forgot Password (Login Only) */}
                {!isSignup && (
                    <div className="flex items-center justify-between text-sm">
                        
                        {/* Remember Me */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-[#082D47]"/>
                            Remember me
                        </label>

                        {/* Forgot Password */}
                        <Link href="/" className="text-[#082D47] dark:text-[#306C96] font-semibold hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 space-y-4 flex flex-col gap-2 text-center">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-[#082D47] border border-white text-white font-bold py-4 rounded-xl hover:bg-[#082D47B2] transition-colors shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : (isSignup ? "Sign up" : "Login")}
                    </button>

                    <button 
                        type="button"
                        className="w-full bg-white border border-gray-300 text-[#0a2540] hover:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#082D47B2] transition-colors duration-200 shadow-lg"
                    >
                        {isSignup ? "Sign up with Google" : "Login with Google"} <FcGoogle size={20} />
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm ">
                {isSignup ? (
                    <>
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-bold hover:underline">Login</Link>
                    </>
                ) : (
                    <>
                        Don’t have an account?{" "}
                        <Link href="/auth/signup" className="font-bold hover:underline">Sign up</Link>
                    </>
                )}
            </div>
        </>
    )
}

export default AuthForm;
