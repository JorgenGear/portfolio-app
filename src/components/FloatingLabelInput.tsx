'use client'

import { ChangeEvent } from 'react'

interface FloatingLabelInputProps {
    id: string
    name: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    label: string
    required?: boolean
    type?: string
    isTextArea?: boolean
    rows?: number
}

export default function FloatingLabelInput({
    id,
    name,
    value,
    onChange,
    label,
    required = false,
    type = 'text',
    isTextArea = false,
    rows = 3
}: FloatingLabelInputProps) {
    const InputComponent = isTextArea ? 'textarea' : 'input'

    return (
        <div className="relative">
            <InputComponent
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                rows={isTextArea ? rows : undefined}
                className="block w-full px-4 py-3 text-white bg-white/10 rounded-lg 
                          border border-gray-600 focus:border-blue-500 focus:outline-none 
                          focus:ring-2 focus:ring-blue-500/20 transition-colors
                          placeholder-shown:pt-3 not-placeholder-shown:pt-6
                          peer"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute text-gray-400 duration-300 transform 
                          -translate-y-3 scale-75 top-4 z-10 origin-[0] 
                          left-4 peer-placeholder-shown:scale-100 
                          peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3"
            >
                {label}
            </label>
        </div>
    )
}
