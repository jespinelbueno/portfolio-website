'use client'

import { useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Database, BarChart3, PanelsTopLeft, LineChart, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

type Skill = {
  name: string
  icon: ReactNode
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
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const activeTrigger = useRef<HTMLButtonElement | null>(null)

  return (
    <section className="section-grid bg-gradient-to-r from-slate-900 to-gray-800 text-white" id="about">
      <div className="portfolio-container relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.55fr_1fr] lg:gap-20 lg:py-24">
          <div className="min-w-0">
            <p className="eyebrow mb-6">Juan Espinel · Analytics & Engineering</p>
            <h1 className="max-w-3xl text-[2.65rem] font-medium leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem]">
              Engineering better ways to work with data.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              I bring a software engineering foundation to healthcare data at R1 RCM. Building tools to analyze billing, check data quality, and make complex information easier to explore.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a href="#projects" className="action-link action-primary">Explore my work <ArrowRight aria-hidden="true" /></a>
              <a href="#contact" className="action-link">Get in touch <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="surface-card overflow-hidden lg:ml-auto lg:w-full lg:max-w-sm">
            <div className="flex items-center gap-5 p-6 sm:p-8 lg:flex-col lg:items-start">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32 lg:h-44 lg:w-44">
                <Image src="/images/headshotsq.jpg" alt="Juan Espinel" fill priority sizes="(min-width: 1024px) 176px, (min-width: 640px) 128px, 96px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-medium tracking-tight sm:text-2xl">Juan Espinel</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Healthcare Data Analytics<br />& Engineering</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-700/70 px-6 py-5 sm:px-8">
              <span className="inline-flex items-center gap-2 text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-gray-200" />Currently at</span>
              <span className="text-sm font-semibold tracking-tight">R1 RCM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-slate-700/60 py-6" aria-label="Core technologies">
          <span className="text-xs font-medium text-slate-400">My everyday toolkit</span>
          {['Python', 'SQL', 'Apache Spark', 'Power BI', 'Databricks', 'Snowflake'].map(tool => <span key={tool} className="text-sm font-medium tracking-tight text-slate-300">{tool}</span>)}
        </div>

        <div className="py-16 sm:py-20">
          <p className="eyebrow mb-4">What I do</p>
          <h2 className="section-title max-w-3xl">From complex data to clarity.<br /><span className="text-slate-400">The tools and thinking behind my work.</span></h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {skills.map(skill => (
              <button key={skill.name} type="button" aria-haspopup="dialog" aria-label={`Explore ${skill.name}`} className="surface-card interactive-card group flex min-w-0 flex-col p-6 text-left sm:p-8" onClick={event => { activeTrigger.current = event.currentTarget; setSelectedSkill(skill) }}>
                <span className="mb-6 flex w-full items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-gray-200">{skill.icon}</span>
                  <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{skill.name}</h3>
                <p className="mb-7 mt-3 max-w-lg text-sm leading-7 text-slate-300">{skill.description}</p>
                <span className="mt-auto flex flex-wrap gap-2">{skill.technologies.slice(0, 3).map(tech => <span key={tech} className="tech-tag">{tech}</span>)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={selectedSkill !== null} onOpenChange={open => !open && setSelectedSkill(null)}>
        <DialogContent onCloseAutoFocus={event => { event.preventDefault(); activeTrigger.current?.focus() }} className="border-slate-700 bg-gradient-to-r from-black to-gray-800 p-7 text-white sm:max-w-lg sm:p-8">
          <DialogHeader className="text-left">
            <div className="mb-5 text-gray-200">{selectedSkill?.icon}</div>
            <DialogTitle className="pr-6 text-2xl font-medium leading-tight">{selectedSkill?.name}</DialogTitle>
            <DialogDescription className="pt-3 text-base leading-7 text-slate-300">{selectedSkill?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-3 border-t border-slate-700 pt-5">
            <h4 className="mb-3 text-xs font-medium text-slate-400">Tools & technologies</h4>
            <div className="flex flex-wrap gap-2">{selectedSkill?.technologies.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}</div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
