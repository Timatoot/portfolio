"use client"

import type React from "react"

import { Github, Mail, Check } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [copied, setCopied] = useState(false)

  // Email obfuscation
  useEffect(() => {
    // Reconstruct the email on client-side to avoid scraping
    const username = "tim.rostorhuiev"
    const domain = "gmail.com"
    setEmail(`${username}@${domain}`)
  }, [])

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Failed to copy email: ", err)
    }
  }

  return (
    <footer className="bg-black py-6 text-center text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6 mb-4">
          <div className="relative">
            <button
              onClick={copyEmail}
              className="flex items-center text-white hover:text-pink-600 transition-colors group"
              aria-label="Copy email address"
            >
              <Mail size={18} className="mr-2" />
              <span data-email-username="tim.rostorhuiev" data-email-domain="gmail.com">
                {email || "tim.rostorhuiev" + String.fromCharCode(64) + "gmail.com"}
              </span>
            </button>

            {/* Copy Notification */}
            {copied && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-3 py-1 rounded text-sm flex items-center animate-fade-in">
                <Check size={14} className="mr-1 text-green-500" />
                Email copied!
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Timatoot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 p-3 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/timrostorhuiev"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 p-3 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm">TYMUR ROSTORHUIEV ©{currentYear}</div>
      </div>
    </footer>
  )
}
