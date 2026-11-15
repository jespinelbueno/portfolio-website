'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { timelineItems, type TimelineItem } from '@/data/timeline'

  export function EducationExperience({ items = timelineItems }: { items?: TimelineItem[] }) {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [filter, setFilter] = useState<"all" | "education" | "experience">("all");
    const [progress, setProgress] = useState(0);
  
    const toggleItem = (index: number) => {
      setExpandedItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    };
  
    const filteredItems = items.filter((item) => filter === "all" || item.type === filter);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const newProgress = (scrollPosition / (fullHeight - windowHeight)) * 100;
        setProgress(newProgress);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <section
        className="w-full pt-12 pb-6 md:pt-24 md:pb-12 lg:pt-32 lg:pb16 bg-gradient-to-r text-white from-black to-slate-900"
        id="education-experience"
      >
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Education & Experience
          </h2>
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"}>
              All
            </Button>
            <Button onClick={() => setFilter("education")} variant={filter === "education" ? "default" : "outline"}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Education
            </Button>
            <Button onClick={() => setFilter("experience")} variant={filter === "experience" ? "default" : "outline"}>
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </Button>
          </div>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-400 max-[570px]:left-4" />
            {/* Progress Indicator */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-500 dark:bg-blue-400 transition-all duration-300 ease-out max-[570px]:left-4"
              style={{ height: `${progress}%` }}
            />
            {/* Timeline Items */}
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-12 flex w-full ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  } max-[400px]:flex-row max-[570px]:items-start max-[570px]:space-x-4`}
                >
                  {/* Timeline Icon */}
                  <div className="z-20 flex items-center justify-center bg-gray-800 shadow-xl w-12 h-12 rounded-full max-[4700px]:w-10 max-[570px]:h-10 max-[570px]:ml-0">
                    {item.type === "education" ? (
                      <GraduationCap className="w-6 h-6 text-white max-[570px]:w-5 max-[570px]:h-5" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-white max-[570px]:w-5 max-[570px]:h-5" />
                    )}
                  </div>
  
                  {/* Timeline Card */}
                  <div className="from-black to-gray-800 dark:bg-gray-900 rounded-lg shadow-xl px-6 py-4 w-5/12 max-[570px]:w-full max-[570px]:ml-2">
                    <Card
                      className={`cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl`}
                      onClick={() => toggleItem(index)}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center flex-wrap">
                          <span>{item.title}</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {item.dateLabel ?? (item.startYear ? `${item.startYear} - ${item.endYear ?? ''}` : item.endYear ?? '')}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-bold text-gray-500 dark:text-blue-400">{item.institution}</p>
                        <p className="text-sm mt-2">{item.description}</p>
                        <AnimatePresence>
                          {expandedItems.includes(index) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 text-sm text-gray-600 dark:text-gray-300"
                            >
                              {item.details}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="mt-4 flex justify-center">
                          {expandedItems.includes(index) ? (
                            <ChevronUp className="w-6 h-6 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }