"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import { motion } from "framer-motion"
import { FileDown } from "lucide-react"
import ParticleBackground from "./ParticleBackground"

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Software Engineer", "Robotics Programmer", "Web Developer"],
    loop: true,
    delaySpeed: 2000,
  })

  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()

        // Calculate mouse position relative to the hero section
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  // Calculate movement values for parallax effect
  const calcMovement = (factor: number, dimension: "x" | "y") => {
    if (windowSize.width === 0) return 0

    const value =
      dimension === "x"
        ? (mousePosition.x / windowSize.width - 0.5) * factor
        : (mousePosition.y / windowSize.height - 0.5) * factor

    return value
  }

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground mousePosition={mousePosition} />

      {/* Subtle light effect that follows cursor */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full radial-gradient opacity-20 pointer-events-none"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <p className="text-lg">Hello, my name is</p>
            <h2 className="text-5xl md:text-6xl font-bold">
              Tim <span className="text-pink-600">Rostorhuiev</span>
            </h2>
            <div className="h-16">
              <p className="text-2xl">
                I am a <span className="text-pink-600">{text}</span>
                <Cursor cursorColor="#e91e63" />
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-full transition-colors"
              >
                View my work
              </button>
              <a
                href="/resume.pdf"
                download
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-colors flex items-center gap-2"
              >
                <FileDown size={18} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg"
              animate={{
                x: calcMovement(-15, "x"),
                y: calcMovement(-15, "y"),
                rotateX: calcMovement(5, "y"),
                rotateY: calcMovement(-5, "x"),
              }}
              transition={{ type: "spring", stiffness: 75, damping: 30 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-transparent rounded-lg"></div>
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Your portrait"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            className="w-1 h-2 bg-pink-600 rounded-full"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-sm mt-2 text-gray-300"
        >
          Scroll Down
        </motion.p>
      </div>
    </section>
  )
}
