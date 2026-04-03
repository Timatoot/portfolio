"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Calendar } from "lucide-react"

type ExperienceItem = {
  id: number
  role: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "reFern",
    period: "Feb 2026 - Present",
    description: "Built AI-powered document parsing features for a web application, focusing on structured extraction, frontend performance, testing, and product reliability",
    responsibilities: [
      "Developed a Python-based AI parsing pipeline using Gemini API and OCR to extract 20+ structured fields from user-uploaded documents",
      "Optimized JavaScript and TypeScript performance across core pages, reducing load time by 36% from 1.1s to 0.7s",
      "Built React-based automated tests for 5+ components and resolved 12+ front-end and back-end issues across upload, parsing, and UI workflows",
    ],
    technologies: ["Flask", "React.js", "Next.js", "TypeScript", "OCR"],
  },
  {
    id: 2,
    role: "Co-op Student",
    company: "SAP",
    period: "Sep 2023 - Feb 2024",
    description: "Built a diversity engagement platform within SAP Build, contributing across frontend logic, data modeling, API integration, and technical presentation",
    responsibilities: [
      "Engineered custom JavaScript extensions to execute matching logic across 3 distinct identity vectors",
      "Designed a cloud-based data model to manage event metadata and user profiles without a traditional SQL backend",
      "Integrated external REST APIs to auto-populate location coordinates, eliminating manual entry for 5 fields",
      "Delivered a working proof-of-concept to 80+ senior stakeholders to validate technical feasibility",
    ],
    technologies: ["JavaScript", "REST APIs", "Cloud Data Modeling", "SAP Build"],
  },
  {
    id: 3,
    role: "Software Lead",
    company: "Trojans FIRST Robotics",
    period: "Sep 2021 - Jun 2024",
    description: "Led software development for a competitive robotics team, building control systems, computer vision, and autonomous robot functionality while managing a 12-person programming team",
    responsibilities: [
      "Architected Java-based control systems for 6 competitive robots, implementing closed-loop PID for sub-inch motor precision",
      "Developed a computer vision pipeline using OpenCV to identify targets at 30 FPS and align swerve drive mechanisms autonomously",
      "Managed a 12-person software team and enforced Git-based version control during high-pressure competition cycles",
    ],
    technologies: ["Java", "OpenCV", "WPILib", "GitHub", "Embedded Systems"],
  },
]

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Work <span className="text-pink-600">Experience</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            My professional journey as a developer. Click on each card to see more details.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-pink-600 pl-8 ml-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 relative"
              >
                <div className="absolute left-[-41px] top-0 w-6 h-6 rounded-full bg-pink-600 border-4 border-black"></div>
                <div
                  className={`bg-zinc-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    expandedId === exp.id ? "shadow-lg shadow-pink-600/20" : ""
                  }`}
                >
                  <div className="p-6 flex justify-between items-center" onClick={() => toggleExpand(exp.id)}>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-pink-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm text-gray-400 mr-4">{exp.period}</span>
                      {expandedId === exp.id ? (
                        <ChevronUp size={20} className="text-pink-600" />
                      ) : (
                        <ChevronDown size={20} className="text-pink-600" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 mb-4">{exp.description}</p>
                          <div className="mb-4">
                            <h4 className="text-lg font-medium mb-2 text-white">Key Responsibilities:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-300">
                              {exp.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium mb-2 text-white">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span key={i} className="bg-zinc-700 px-3 py-1 rounded-full text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
