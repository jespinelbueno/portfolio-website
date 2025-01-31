'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type TimelineItem = {
  title: string;
  institution: string;
  startYear: number;
  endYear: number | 'Present';
  description: string;
  details: string;
  type: 'education' | 'experience';
}

const timelineItems: TimelineItem[] = [
    {
        title: "Master of Science in Cybersecurity",
        institution: "Liberty University",
        startYear: 2024,
        endYear: 2026,
        description: "Graduate-level cybersecurity program with a focus on information security.",
        details: "Maintaining a 4.0 GPA while exploring cybersecurity methodologies and best practices.",
        type: "education"
      },
    {
        
      title: "Diversity Recruitment Specialist",
      institution: "Liberty University",
      startYear: 2023,
      endYear: "Present",
      description: "Responsible for diversity recruitment strategies and student engagement.",
      details: "Streamlined data collection processes managing more than 1500 leads from the academic year 2023 to 2024, improving tracking efficiency and increasing matriculation rates by 330%. Delivered engaging presentations at 30+ recruitment events, increasing inquiries by 200% within 13 months. Assisted in allocating $250,000 annually in scholarship grants. Used Liberty University's CRM integration to monitor the progress of more than 1,500 recruited students.",
      type: "experience"
    },
    {
      title: "Software Engineer Capstone",
      institution: "Liberty University",
      startYear: 2022,
      endYear: 2023,
      description: "Internship focused on software development and Agile processes.",
      details: "Pioneered a social media development framework using the PERN stack, significantly improving application performance and user experience.",
      type: "experience"
    },
    {
      title: "Full Stack Developer Intern",
      institution: "Nicely Done Sites (Remote)",
      startYear: 2021,
      endYear: 2021,
      description: "Worked on developing dynamic e-commerce websites.",
      details: "Developed and launched more than 10 dynamic e-commerce websites using WordPress and WooCommerce, enhancing user engagement. Developed web applications using JavaScript, HTML5, and CSS, improving user experience within four months.",
      type: "experience"
    },
    {
      title: "IT Specialist & Web Developer",
      institution: "Aquathermic S.A.S., Bogotá, Colombia",
      startYear: 2019,
      endYear: 2019,
      description: "Part-time IT and web development role.",
      details: "Resolved software and hardware issues for 10+ company computers within three months, reducing downtime. Led the development of the company's website, ensuring alignment with business goals and improving online presence.",
      type: "experience"
    },
    {
      title: "Bachelor of Science in Computer Science: Software Engineering",
      institution: "Liberty University",
      startYear: 2019,
      endYear: 2023,
      description: "Undergraduate program in Computer Science with a a focus in software engineering and a strong conceptual and technical foundation.",
      details: "Gained experience in programming data structures in C/C++, full-stack development, database administration, and data analytics. Participated in multiple projects focused on software development and data-driven decision-making.",
      type: "education"
    }
  ];
  

  export function EducationExperience() {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [filter, setFilter] = useState<"all" | "education" | "experience">("all");
    const [progress, setProgress] = useState(0);
  
    const toggleItem = (index: number) => {
      setExpandedItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    };
  
    const filteredItems = timelineItems.filter((item) => filter === "all" || item.type === filter);
  
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
                            {item.startYear} - {item.endYear}
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