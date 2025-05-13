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
    role: "Software Lead",
    company: "Trojans FIRST Robotics",
    period: "Sep 2021 - Jun 2024",
    description: "Led a programming team of 12 students, overseeing development and implementation of robot control systems.",
    responsibilities: [
      "Developed embedded systems for robot control",
      "Designed and implemented vision systems, 3D mapping, ML algorithms",
      "Managed a codebase to handle robot automation and controls",
      "Spearheaded the team’s first-ever swerve drive system",
    ],
    technologies: ["Java", "Python", "Flutter", "WPILib", "GitHub"],
  },
  {
    id: 2,
    role: "Co-op Student",
    company: "SAP",
    period: "Sep 2023 - Feb 2024",
    description: "Developed a sustainability-focused application using SAP Build.",
    responsibilities: [
      "Created presentations to showcase technological solutions",
      "Explored Virtual Reality technologies such as RAUM",
      "Cultivated storytelling and presentation abilities under expert mentorship",
      "Collaborated with peers to design and implement a sustainability-focused application",
    ],
    technologies: ["Python", "REST", "RAUM", "SAP Build", "JavaScript"],
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
