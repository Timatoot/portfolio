"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Layout, Server, Smartphone, Terminal, GitBranch, Paintbrush } from "lucide-react"

type Skill = {
  name: string
  icon: React.ReactNode
  level: string
  tools: string[]
  projects: string
}

const skills: Skill[] = [
  {
    name: "Frontend",
    icon: <Layout className="w-10 h-10" />,
    level: "Intermediate",
    tools: ["HTML", "CSS", "JavaScript", "React", "FlutterFlow"],
    projects: "Created responsive interfaces for multiple games and apps",
  },
  {
    name: "Backend",
    icon: <Server className="w-10 h-10" />,
    level: "Advanced",
    tools: ["Flask", ".NET", "Java", "Python", "C#"],
    projects: "Developed RESTful APIs, blockchain logic with Flask and built backend services for Unity games",
  },
  {
    name: "Database",
    icon: <Database className="w-10 h-10" />,
    level: "Intermediate",
    tools: ["MongoDB", "SQLite", "Firebase", "SAP Build"],
    projects: "Implemented data persistence and secure storage, in Flask and Unity projects",
  },
  {
    name: "Mobile",
    icon: <Smartphone className="w-10 h-10" />,
    level: "Beginner",
    tools: ["FlutterFlow"],
    projects: "Designed and deployed mobile-first applications with FlutterFlow, integrating backend logic",
  },
  {
    name: "DevOps",
    icon: <Terminal className="w-10 h-10" />,
    level: "Beginner",
    tools: ["Git", "GitHub", "SAP Build"],
    projects: "Gained exposure to enterprise DevOps workflows during SAP co-op",
  },
  {
    name: "UI/UX",
    icon: <Paintbrush className="w-10 h-10" />,
    level: "Advanced",
    tools: ["Unity", "FlutterFlow", "SAP Build"],
    projects: "Prioritized user-friendly design in both professional and personal applications",
  },
  {
    name: "Version Control",
    icon: <GitBranch className="w-10 h-10" />,
    level: "Expert",
    tools: ["Git", "GitHub", "GitLens"],
    projects: "Managed code repositories and collaborated with development teams",
  },
  {
    name: "Programming",
    icon: <Code className="w-10 h-10" />,
    level: "Expert",
    tools: ["Java", "C#", "Python", "C", "JavaScript"],
    projects: "Contributed to large collaborative codebases and led development initiatives",
  },
]

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null)

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-pink-600">Skills</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Hover over each skill to see more details about my experience level, tools I use, and related projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <div className="bg-zinc-800 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center hover:bg-zinc-700 transition-colors cursor-pointer">
                <div className="text-pink-600 mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <p className="text-gray-400 text-sm">{skill.level}</p>
              </div>

              {activeSkill === skill && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute z-10 left-0 right-0 top-full mt-2 bg-zinc-800 rounded-lg p-6 shadow-xl"
                >
                  <h4 className="text-lg font-semibold mb-2 text-pink-600">{skill.name}</h4>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Level:</span> {skill.level}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Tools:</span> {skill.tools.join(", ")}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Projects:</span> {skill.projects}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
