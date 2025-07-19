"use client"

import { useState } from "react"

interface CodeCopyProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

export default function CodeCopy({ code, language = "text", className = "", showLineNumbers = false }: CodeCopyProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const lines = code.split("\n")

  return (
    <div className={`relative group ${className}`}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg">
        <span className="text-sm font-medium capitalize">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative bg-gray-900 rounded-b-lg overflow-hidden">
        <pre className="overflow-x-auto p-4 text-sm text-gray-100 font-mono">
          <code className="block">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-gray-500 pr-4 border-r border-gray-700 mr-4 text-right">
                  {lines.map((_, index) => (
                    <div key={index} className="leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div key={index} className="leading-6">
                      {line || "\u00A0"} {/* Non-breaking space for empty lines */}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>

        {/* Copy success notification */}
        {copied && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium animate-fade-in">
            Copied!
          </div>
        )}
      </div>
    </div>
  )
}
