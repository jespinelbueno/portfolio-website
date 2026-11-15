'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Database, BarChart3, PanelsTopLeft, LineChart, ArrowUpRight } from 'lucide-react'
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
    name: "Data Analysis",
    icon: <LineChart className="h-5 w-5" />,
    description: "Analyzing healthcare billing and payer mapping data to understand billing information and data quality.",
    technologies: ["SQL", "Excel", "Healthcare Reimbursement"]
  },
  {
    name: "Data Engineering & Quality",
    icon: <Database className="h-5 w-5" />,
    description: "Creating quality check pipelines to assess healthcare billing data in Databricks and Snowflake.",
    technologies: ["Databricks", "Snowflake", "SQL", "Data Modeling"]
  },
  {
    name: "Power BI & Reporting",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Creating Power BI reports that make healthcare billing information and data quality easier to understand.",
    technologies: ["Power BI", "Data Visualization", "Data Analysis"]
  },
  {
    name: "Interactive Data Apps",
    icon: <PanelsTopLeft className="h-5 w-5" />,
    description: "Building Python and Streamlit apps to explore billing data and payer mappings, with Spark in Databricks.",
    technologies: ["Python", "Streamlit", "Apache Spark", "Databricks", "Snowflake"]
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
                  src="/images/headshotsq.jpg"
                  alt="Juan Espinel"
                  className="rounded-full border-4 border-gray-600 dark:border-gray-700 object-cover"
                  fill
                  sizes="(min-width: 768px) 192px, (min-width: 640px) 160px, 128px"
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
                <p className="text-slate-300 mt-2">
                  Healthcare Data Analytics & Engineering | R1 RCM
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 relative">
            <h2 className="text-2xl text-white font-bold mb-3">Some things I do</h2>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-2xl">
              I bring a software engineering foundation to healthcare data analytics and engineering at R1 RCM, building tools to analyze billing data, check data quality, and make information easier to explore.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <motion.button
                  type="button"
                  key={skill.name}
                  aria-haspopup="dialog"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  className="text-left border border-slate-700 bg-slate-900/60 p-5 rounded-xl hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition-colors"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="flex text-sky-300 items-center justify-between mb-4">
                    {skill.icon}
                    <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{skill.description}</p>
                </motion.button>
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
