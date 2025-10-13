"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  fullDescription?: string
  image: string
  demoUrl: string
  githubUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "DupeChat AI",
    description:
      "A chat app that creates an AI version of yourself using a 7-question personality quiz and GPT-powered persona generation. Built with React and TypeScript, it includes localStorage-based privacy, streaming chat, persona editing, and optional analytics opt-in.",
    image: "/dupechat_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/DupeChat",
    tags: ["Node.js", "React", "TypeScript", "AI"],
  },
  {
    id: 2,
    title: "FPS Shooter Game",
    description:
      "A fast-paced online FPS built in Unity3D. Includes real-time multiplayer sync, gunplay mechanics, ammo/reload systems, custom animations, and sound effects. Designed for smooth performance and immersive gameplay.",
    image: "/fps_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/the-walls-fps",
    tags: ["C#", "Unity3D", "Game Development", "Online Multiplayer"],
  },
  {
    id: 3,
    title: "Blockchain",
    description:
      "A basic cryptocurrency built from scratch with Python, featuring mining, peer-to-peer transaction validation, and a Proof of Work algorithm. Includes Flask-powered backend and decentralized ledger.",
    image: "/blockchain_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Blockchain",
    tags: ["Flask", "Python", "Blockchain", "PoW"],
  },
  {
    id: 4,
    title: "Snowballer - Top Down Shooter",
    description:
      "A Unity-based arcade shooter game with dynamic enemy AI, collision detection, and power-ups. Focuses on responsive controls, fun gameplay, and performance optimization.",
    image: "/game_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Snowballer",
    tags: ["Unity", "C#", "AI", "Game Development"],
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    description:
      "An interactive and stylish portfolio to showcase my skills, projects, and experience.",
    image: "/portfolio_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/portfolio",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 6,
    title: "Note Management App",
    description:
      "A user-friendly note app built in C# with MongoDB for persistent cloud storage. Features include data serialization, search, and organized note management with an intuitive interface.",
    image: "/note_manager_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/NoteTakingApp",
    tags: ["C#", "MongoDB", ".NET", "Data Serialization"],
  },
  {
    id: 7,
    title: "Expense Organizer",
    description:
      "A web-based tool to help users track spending, plan budgets, and manage income. Developed with Flask and Python, featuring clean UI and category-based analytics.",
    image: "/finance_planner_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Expense-Organizer",
    tags: ["Flask", "Python", "Web App", "Finance"],
  },
  {
    id: 8,
    title: "Scientific Calculator",
    description:
      "A clean, multi-function calculator built to handle basic arithmetic and scientific operations. Designed with an intuitive UI and precise input handling.",
    image: "/calculator_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Calculator",
    tags: ["Java", "Swing", "GUI", "Desktop App"],
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered && !selectedProject && !isAnimating) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }, 3000) // Change project every 3 seconds

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current)
        }
      }
    }
  }, [isHovered, selectedProject, isAnimating])

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const handleProjectClick = (project: Project, index: number) => {
    const isCenter = (index - currentIndex + projects.length) % projects.length === 0
    if (isCenter) {
      setSelectedProject(project)
      document.body.style.overflow = "hidden"
    }
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = "auto"
  }

  // Calculate positions for carousel
  const getProjectStyle = (index: number) => {
    const diff = index - currentIndex
    const absIndex = ((diff % projects.length) + projects.length) % projects.length

    if (absIndex === 0) {
      // Center
      return {
        transform: "translateX(0) scale(1) translateZ(0)",
        opacity: 1,
        zIndex: 10,
      }
    } else if (absIndex === 1 || absIndex === projects.length - 1) {
      // Adjacent
      const side = absIndex === 1 ? 1 : -1
      return {
        transform: `translateX(${side * 70}%) scale(0.8) translateZ(-100px)`,
        opacity: 0.7,
        zIndex: 5,
      }
    } else if (absIndex === 2 || absIndex === projects.length - 2) {
      // Far
      const side = absIndex === 2 ? 1 : -1
      return {
        transform: `translateX(${side * 90}%) scale(0.6) translateZ(-200px)`,
        opacity: 0.3,
        zIndex: 1,
      }
    } else {
      // Hidden
      return {
        transform: "translateX(0) scale(0.5) translateZ(-300px)",
        opacity: 0,
        zIndex: 0,
      }
    }
  }

  return (
    <section id="projects" className="py-20 bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-pink-600">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Explore my portfolio of projects. Hover to pause, click for details.
          </p>
        </motion.div>

        {/* 3D Carousel */}
         <div
          className="relative h-[500px] perspective-[2000px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setHoveredProjectIndex(null)
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => {
              const style = getProjectStyle(index)
              const isCenter = (index - currentIndex + projects.length) % projects.length === 0
              const isHoveredProject = hoveredProjectIndex === index

              return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer"
                  style={{
                    ...style,
                    transformStyle: "preserve-3d",
                  }}
                  animate={style}
                  transition={{
                    duration: 0.8,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  onClick={() => handleProjectClick(project, index)}
                  onMouseEnter={() => setHoveredProjectIndex(index)}
                  onMouseLeave={() => setHoveredProjectIndex(null)}
                  whileHover={
                    isCenter
                      ? {
                          scale: 1.05,
                          y: -10,
                        }
                      : !isCenter && style.opacity > 0
                        ? {
                            scale: style.transform.includes("0.8") ? 0.85 : 0.65,
                            opacity: Math.min((style.opacity as number) + 0.2, 1),
                          }
                        : {}
                  }
            >
              <div
                className={`relative w-[400px] h-[300px] bg-zinc-800 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      isCenter
                        ? "border-pink-600 shadow-2xl shadow-pink-600/20"
                        : isHoveredProject
                          ? "border-pink-600/50 shadow-lg shadow-pink-600/10"
                          : "border-zinc-700"
                    }`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                       className={`object-cover transition-all duration-500 ${
                        isHoveredProject ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 transition-all duration-300 ${
                        isHoveredProject ? "from-black/95 via-black/60" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-300 line-clamp-2">{project.title}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                              isHoveredProject ? "bg-pink-600/80" : "bg-zinc-700/80"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isCenter && isHoveredProject && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 text-sm text-pink-400 font-medium"
                        >
                          Click to view details →
                        </motion.div>
                      )}
                    </div>
                  </div>
                  </motion.div>
              )
            })}
          </div>

          {/* Navigation Arrows - Only show when hovered */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={handlePrevious}
                  disabled={isAnimating}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-800/90 hover:bg-pink-600 p-4 rounded-full transition-all z-20 ${
                    isAnimating ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                  }`}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleNext}
                  disabled={isAnimating}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800/90 hover:bg-pink-600 p-4 rounded-full transition-all z-20 ${
                    isAnimating ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                  }`}
                  aria-label="Next project"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setCurrentIndex(index)
                    setTimeout(() => setIsAnimating(false), 800)
                  }
                }}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-pink-600" : "w-2 bg-zinc-600 hover:bg-zinc-500 hover:w-4"
                } ${isAnimating ? "cursor-not-allowed" : ""}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-pink-600 shadow-2xl shadow-pink-600/20 modal-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-zinc-800 hover:bg-pink-600 p-2 rounded-full transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                {/* Project Image */}
                <div className="relative h-[400px] w-full">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-pink-600">About This Project</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-pink-600">Technologies Used</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-zinc-800 px-4 py-2 rounded-lg text-center hover:bg-zinc-700 transition-colors"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Github size={18} />
                      <span>Learn More</span>
                    </a>
                    {/* Uncomment below to enable live demo link */}
                    {/* 
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                    */}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
