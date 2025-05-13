"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Lightbulb, BookOpen, Car, Gamepad2, Bike, Users } from "lucide-react"

type TimelineItem = {
  year: string
  title: string
  description: string
}

const educationTimeline: TimelineItem[] = [
  {
    year: "2024 - 2028",
    title: "Computer Science Degree",
    description: "Currently pursuing a Bachelor's degree in Computer Science at Queen's University",
  },
  {
    year: "2023",
    title: "HarvardX CS50",
    description: "Completed the CS50 course, an introduction to computer science and programming",
  },
]

const hobbiesTimeline: TimelineItem[] = [
  {
    year: "",
    title: "Cars",
    description: "Passionate about cars and racing, especially Formula 1",
  },
  {
    year: "",
    title: "Video Games",
    description: "I enjoy playing video games, especially FPS and multiplayer co-op games",
  },
  {
    year: "",
    title: "Basketball",
    description: "Playing basketball with friends",
  },
  {
    year: "",
    title: "Biking",
    description: "Exploring my city and the regions around it on my bike",
  },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" className="py-20 bg-zinc-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full filter blur-[150px] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-pink-600">Me</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Here's a bit about my background and interests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Education Timeline */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 relative"
          >
            <div className="absolute -top-5 left-8 bg-pink-600 p-3 rounded-lg shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-8 mt-4 text-pink-600">Education</h3>

            <div className="space-y-8">
              {educationTimeline.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8 border-l border-pink-600">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-pink-600"></div>
                  <div className="mb-1 text-sm text-pink-400">{item.year}</div>
                  <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Hobbies & Interests with Visual Flair */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 relative"
          >
            <div className="absolute -top-5 left-8 bg-pink-600 p-3 rounded-lg shadow-lg">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-8 mt-4 text-pink-600">Hobbies & Interests</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hobbiesTimeline.map((hobby, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-zinc-700 p-5 rounded-lg hover:bg-zinc-600 transition-colors group"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-pink-600 bg-opacity-20 flex items-center justify-center mr-3 group-hover:bg-opacity-40 transition-colors">
                      {index === 0 && <Car className="w-5 h-5 text-pink-600" />}
                      {index === 1 && <Gamepad2 className="w-5 h-5 text-pink-600" />}
                      {index === 2 && <Users className="w-5 h-5 text-pink-600" />}
                      {index === 3 && <Bike className="w-5 h-5 text-pink-600" />}
                    </div>
                    <h4 className="text-lg font-medium">{hobby.title}</h4>
                  </div>
                  <p className="text-gray-400">{hobby.description}</p>
                  <div className="mt-3 text-sm text-pink-400">{hobby.year}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Personal Statement with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-zinc-800 to-zinc-900 p-8 rounded-lg border border-zinc-700 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-600 opacity-10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-semibold mb-4 text-white">Me</h3>
          <p className="text-gray-300 relative z-10 whitespace-normal break-words">
            {`Hi! I'm Tim, a Computer Science student with a passion for technology, creativity, 
            and building things that solve real problems. I'm especially interested in the fields 
            of quantum computing and cybersecurity, and I'm always looking for ways to deepen my 
            knowledge in both. In my free time, I enjoy experimenting with code, learning new tools, 
            and working on personal tech projects. Outside of school, I like staying active, spending 
            time with friends, and unwinding with games. I'm always excited to learn, take on new challenges, 
            and connect with people.`}
          </p>
        </motion.div>

        {/* Resume Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/tim_rostorhuiev_resume.pdf"
            download
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg border border-zinc-700 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center group-hover:bg-pink-700 transition-colors">
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium">Download My Resume</p>
              <p className="text-sm text-gray-400">Get a copy of my detailed CV</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
