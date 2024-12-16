'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FiCopy } from 'react-icons/fi'
import { useState } from 'react'

interface CodeBlockProps {
    code: string
    language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy code"
            >
                <FiCopy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-300'}`} />
            </button>
            <SyntaxHighlighter
                language={language}
                style={atomDark}
                customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
} 