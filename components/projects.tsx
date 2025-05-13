"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  demoUrl: string
  githubUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Blockchain",
    description:
      "A basic cryptocurrency built from scratch with Python, featuring mining, peer-to-peer transaction validation, and a Proof of Work algorithm. Includes Flask-powered backend and decentralized ledger.",
    image: "/blockchain_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Blockchain",
    tags: ["Flask", "Python", "Blockchain", "PoW"],
  },
  {
    id: 2,
    title: "Snowballer - Top Down Shooter",
    description:
      "A Unity-based arcade shooter game with dynamic enemy AI, collision detection, and power-ups. Focuses on responsive controls, fun gameplay, and performance optimization.",
    image: "/game_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Snowballer",
    tags: ["Unity", "C#", "AI", "Game Development"],
  },
  {
    id: 3,
    title: "Note Management App",
    description:
      "A user-friendly note app built in C# with MongoDB for persistent cloud storage. Features include data serialization, search, and organized note management with an intuitive interface.",
    image: "/note_manager_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/NoteTakingApp",
    tags: ["C#", "MongoDB", ".NET", "Data Serialization"],
  },
  {
    id: 4,
    title: "Expense Organizer",
    description:
      "A web-based tool to help users track spending, plan budgets, and manage income. Developed with Flask and Python, featuring clean UI and category-based analytics.",
    image: "/finance_planner_project.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/Expense-Organizer",
    tags: ["Flask", "Python", "Web App", "Finance"],
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    description:
      "An interactive and stylish portfolio to showcase my skills, projects, and experience.",
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "https://github.com/Timatoot/portfolio",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 6,
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
  return (
    <section id="projects" className="py-20 bg-zinc-900">
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
            Check out some of my recent work. Each project showcases different skills and technologies.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                {/* Project Image with Glow Effect */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute -inset-0.5 bg-pink-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                  <div className="relative bg-zinc-900 rounded-lg overflow-hidden aspect-video">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-px bg-pink-600 w-12"></div>
                    <div className="text-pink-600 font-medium">Featured Project</div>
                  </div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="bg-zinc-800 p-6 rounded-lg shadow-lg relative z-10">
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-800 px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    {/* TODO: Uncomment the demo link if you have a live demo */}
                    {/*<a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-pink-600 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>*/}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      <Github size={18} />
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              {index % 2 === 0 ? (
                <div className="hidden md:block absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-pink-600 opacity-30"></div>
              ) : (
                <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-pink-600 opacity-30"></div>
              )}
              {index % 2 === 0 ? (
                <div className="hidden md:block absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-pink-600 opacity-30"></div>
              ) : (
                <div className="hidden md:block absolute -bottom-10 -left-10 w-20 h-20 border-b-2 border-l-2 border-pink-600 opacity-30"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
