"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-black/90 backdrop-blur-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-pink-600">TR</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["hero", "about", "skills", "projects", "experience"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-pink-600 transition-colors capitalize"
              >
                {section === "hero" ? "Home" : section}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <Button
            className="hidden md:block bg-pink-600 hover:bg-pink-700 text-white"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            {["hero", "about", "skills", "projects", "experience"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-pink-600 transition-colors capitalize py-2"
              >
                {section === "hero" ? "Home" : section}
              </button>
            ))}
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white w-full"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
