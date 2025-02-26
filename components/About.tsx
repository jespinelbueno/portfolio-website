'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Code, Database, Globe, Shield, BarChartIcon as ChartBar, Headphones, Network, Lock, LineChart } from 'lucide-react'
import React from 'react'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

type Skill = {
  name: string
  icon: React.ReactNode
  description: string
  technologies: string[]
}

const skills: Skill[] = [
  {
    name: "Frontend Development",
    icon: <Code className="h-6 w-6" />,
    description: "Creating responsive and interactive user interfaces with modern web technologies.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    icon: <Database className="h-6 w-6" />,
    description: "Building robust server-side applications and APIs to power web applications.",
    technologies: ["Node.js", "Express", "Python", "Prisma", "C/C++"]
  },
  {
    name: "Full Stack Development",
    icon: <Globe className="h-6 w-6" />,
    description: "Combining frontend and backend skills to create complete web solutions.",
    technologies: ["MERN Stack", "PERN stack", "GraphQL", "RESTful APIs"]
  },
  {
    name: "IT Support",
    icon: <Headphones className="h-6 w-6" />,
    description: "Providing technical assistance and support for hardware, software, and network issues.",
    technologies: ["Help Desk Systems", "Remote Desktop", "Troubleshooting", "User Training"]
  },
  {
    name: "Cybersecurity",
    icon: <Shield className="h-6 w-6" />,
    description: "Implementing security measures to protect systems, networks, and data from cyber threats.",
    technologies: ["Firewalls", "Encryption", "Security Audits"]
  },
  {
    name: "Network Administration",
    icon: <Network className="h-6 w-6" />,
    description: "Managing and maintaining computer networks to ensure optimal performance and security.",
    technologies: ["LAN/WAN", "VPN", "Network Protocols", "Router Configuration"]
  },
  {
    name: "Information Security",
    icon: <Lock className="h-6 w-6" />,
    description: "Safeguarding sensitive information and managing data privacy compliance.",
    technologies: [ "Data Classification", "Access Control", "Security Policies"]
  },
  {
    name: "Data Analysis",
    icon: <LineChart className="h-6 w-6" />,
    description: "Extracting insights from complex datasets to drive informed decision-making.",
    technologies: ["Python", "SQL", "Statistical Analysis", "Machine Learning"]
  },
  {
    name: "Data Visualization",
    icon: <ChartBar className="h-6 w-6" />,
    description: "Transforming complex data into clear, insightful visual representations.",
    technologies: ["Automate", "Excel", "Tableau", "Power BI"]
  }
]

export function About() {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-900 to-gray-800 dark:bg-gray-900" id="about">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 bg-gradient-to-r from-gray-800 to-gray-900 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row md:flex-col items-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src="/images/headshotsq.jpg?height=300&width=300"
                  alt="Your Name"
                  className="rounded-full border-4 border-gray-600 dark:border-gray-700"
                  layout="fill"
                  objectFit="cover"
                />
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                  >
                    <p className="text-white text-sm">Hello there!</p>
                  </motion.div>
                )}
              </motion.div>
              <div className="mt-4 sm:mt-0 sm:ml-6 md:mt-4 md:ml-0 text-center sm:text-left md:text-center">
                <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Juan Espinel
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Full Stack Development / Cyber Security / IT Services
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 relative">
            <h2 className="text-2xl text-gray-500 font-bold mb-6">Some things I do...</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-black to-gray-800  dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="flex text-white items-center justify-center mb-2">
                    {skill.icon}
                  </div>
                  <h3 className="text-center text-white font-semibold">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={selectedSkill !== null} onOpenChange={(open: boolean) => !open && setSelectedSkill(null)}>
        <DialogContent className="bg-gradient-to-r from-black to-gray-800 border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedSkill?.icon}
              <span className="ml-2">{selectedSkill?.name}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedSkill?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div>
            <h4 className="text-sm font-semibold mb-1 text-white">Technologies:</h4>
            <div className="flex flex-wrap gap-1">
              {selectedSkill?.technologies.map((tech, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 px-1 py-0.5 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}