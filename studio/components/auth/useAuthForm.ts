import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export type AuthMode = "login" | "signup"

// --- Validation Schemas ---

const EMAIL_MAX_LENGTH = 255
const PASSWORD_MIN_LENGTH = 10

const weakPasswords = ['123456', 'password', '12345678', 'qwerty']

export const signupSchema = z.object({
        email: z
            .string()
            .trim()
            .min(1, { message: 'Email is required.' })
            .email({ message: 'Please enter a valid email address.' })
            .max(EMAIL_MAX_LENGTH, { message: 'Email is too long.' })
            .transform((val) => val.toLowerCase())
            .refine(
                (val) => /^[a-z0-9._%+-]{9,}@gmail\.com$/.test(val),
                'Email must be a valid Gmail address with at least 9 characters before @'
            ),
        
        password: z
            .string()
            .min(PASSWORD_MIN_LENGTH, {
                message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
            })
            .regex(/[A-Za-z]/, {
                message: 'Password must contain letters.',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain numbers.',
            })
            .refine((val) => !val.includes(' '), {
                message: 'Password must not contain spaces.',
            })
            .refine((val) => !weakPasswords.includes(val), {
                message: 'Password is too weak.',
            }),

        confirmPassword: z.string().min(1, {
            message: 'Confirm password is required.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
})

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .max(EMAIL_MAX_LENGTH),

    password: z.string().min(1, { message: 'Password is required.' }),
})

//  Validation function for onBlur 
export function validateFieldOnBlur(
    name: string,
    value: string
    ): string | null {
    if (!value.trim()) {
        return `${name} is required.`
    }

    return null
}


// --- API Helper ---


type AuthPayload = {
    mode: AuthMode
    email: string
    password: string
    confirmPassword?: string
}

async function fetchAuth(payload: AuthPayload) {
    const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}


// --- Hook ---

export const useAuthForm = (mode: AuthMode) => {
    type AuthField = 'email' | 'password' | 'confirmPassword'
    type AuthErrors = Partial<Record<AuthField, string>>

    const router = useRouter()
    const isSignup = mode === "signup"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    // const [errors, setErrors] = useState<Record<string, string>>({})
    const [errors, setErrors] = useState<AuthErrors>({})

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     setError('')
    //     setErrors({})
    //     setLoading(true)

    //     // 1. Prepare Data
    //     const formData = {
    //         email,
    //         password,
    //         confirmPassword: isSignup ? confirmPassword : undefined,
    //     }

    //     // 2. Select Schema
    //     const schema = isSignup ? signupSchema : loginSchema

    //     // 3. Validation
    //     const result = schema.safeParse(formData)

    //     if (!result.success) {
    //         const newErrors: Record<string, string> = {}
    //         result.error.issues.forEach((issue) => {
    //             const path = issue.path[0]
    //             if (typeof path !== 'undefined') {
    //                 newErrors[String(path)] = issue.message
    //             }
    //         })
    //         setErrors(newErrors)
    //         setLoading(false)
    //         return
    //     }

    //     // 4. Submit
    //     try {
    //         const data = await fetchAuth({ email: result.data.email, password: result.data.password });

    //         if (data.accessToken) {
    //             localStorage.setItem('token', data.accessToken);
    //             if (data.user) {
    //                 localStorage.setItem('user', JSON.stringify(data.user));
    //             }
    //             router.push('/');
    //         }
    //     } catch (err: any) {
    //         setError(err.message || 'An error occurred during authentication.');
    //         setLoading(false)
    //     }
    // }


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setErrors({})

    const schema = isSignup ? signupSchema : loginSchema
    const payload = { email, password, ...(isSignup && { confirmPassword }) }

    const parsed = schema.safeParse(payload)

    if (!parsed.success) {
        const fieldErrors: AuthErrors = {}
        parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as AuthField
        fieldErrors[field] = issue.message
        })
        setErrors(fieldErrors)
        setLoading(false)
        return
    }

    try {
        const data = await fetchAuth({
            mode,
            email: parsed.data.email,
            password: parsed.data.password,
            confirmPassword: isSignup ? confirmPassword : undefined,
        })

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        router.push('/')
    } catch (err: any) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        error,
        errors, setErrors,
        handleSubmit,
        isSignup
    }
}
