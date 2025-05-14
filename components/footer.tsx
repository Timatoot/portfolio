import { Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-6 text-center text-white">
      <div className="container mx-auto px-4">

        <div className="flex justify-center space-x-4 mb-4">
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

        {/* Copyright */}
        <div className="text-sm">TYMUR ROSTORHUIEV ©{currentYear}</div>
      </div>
    </footer>
  )
}
