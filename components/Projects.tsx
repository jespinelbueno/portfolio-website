import { ArrowUpRight, Code2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Projects() {
  const projects = [
    // {
    //   title: "AI Website Background Generator",
    //   description: "Developed a web application for dynamically generating and displaying AI-created background images.",
    //   technologies: "React, seedrandom, AIPicGen API, CSS, and JavaScript.",
    //   url: "https://github.com/jespinelbueno/bg-img-gen" // Example URL
    // }
    {
      title: "FutureScholarsAI",
      description: "Developed an AI-powered student management platform that combines natural language processing, document analysis, and predictive analytics to streamline educational record management and student potential assessment.",
      technologies: "Next.js 14, TypeScript, PostgreSQL, Prisma, TensorFlow.js, Natural.js, Tesseract.js, PDF.js, Tailwind CSS, and Shadcn/ui.",
      url: "https://student-database-app-eta.vercel.app/" // Example URL
    },
    {
      title: "Chat Application",
      description: "Developed a chat application with user authentication, graphic chat interface, real-time message delivery, and password encryption.",
      technologies: "React, PostgreSQL, JavaScript, Node.js, JWT Encryption, Express, pg...",
      url: "https://juandi-chat-app.vercel.app/" // Example URL
    },
    {
      title: "Automatic Email Prep",
      description: "Designed a tool for email composition using Python GUI automation, offering a user-friendly interface and an SMTP alternative for email setup.",
      technologies: "Python, PyAutoGUI, Outlook.",
      url: "https://github.com/jespinelbueno/email-prep" // Example URL
    }
  ]

  return (
    <section className="section-grid w-full border-t border-slate-800 bg-black py-16 sm:py-24" id="projects">
      <div className="portfolio-container relative">
        <p className="eyebrow mb-4">Selected work</p>
        <h2 className="section-title mb-10 text-white">Ideas, built into applications.</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="group flex h-full flex-col transition-colors hover:border-slate-500">
              <CardHeader>
                <div className="mb-8 flex items-center justify-between text-slate-400"><Code2 className="h-5 w-5 text-gray-200" aria-hidden="true" /><span className="font-mono text-xs">0{index + 1}</span></div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-6 text-xs leading-6 text-slate-400"><span className="mb-2 block font-medium text-slate-300">Built with</span>{project.technologies}</p>
                <a className="action-link mt-auto justify-start self-start" href={project.url} target="_blank" rel="noopener noreferrer">
                  View project <ArrowUpRight aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
