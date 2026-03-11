// import React from 'react'
// import { FaPlay } from 'react-icons/fa'

// export const Button = () => {

//     return (
//         // <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <button className="flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 gap-2 bg-white text-[#0a2540] px-6 py-2 rounded-full font-medium focus:bg-sky-950 focus:text-white focus:border-gray-100 focus:border">
//                 <FaPlay size={18} />
//                 Try for free
//             </button>
//         // </div>
//     )
// }


import React from 'react'

export const Button = ({text, icon, onClick, className, disabled, type}: {text: string, icon: React.ReactNode, onClick: () => void, className?: string, disabled?: boolean, type?: "button" | "submit" | "reset"}) => {
    return (
            <button type={type} disabled={disabled} onClick={onClick} className={`flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 gap-2 bg-white text-[#0a2540] px-6 py-2 rounded-full font-medium focus:bg-sky-950 focus:text-white focus:border-gray-100 focus:border ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {icon}
                {text}
            </button>
    )
}
