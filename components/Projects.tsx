import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Projects() {
  const projects = [
    {
      title: "Chat Application",
      description: "Developed a chat application with user authentication, graphic chat interface, real-time message delivery, and password encryption.",
      technologies: "React, PostgreSQL, JavaScript, Node.js, JWT Encryption, Express, pg..."
    },
    {
      title: "AI Website Background Generator",
      description: "Developed a web application for dynamically generating and displaying AI-created background images.",
      technologies: "React, seedrandom, AIPicGen API, CSS, and JavaScript."
    },
    {
      title: "Automatic Email Prep",
      description: "Designed a tool for email composition using Python GUI automation, offering a user-friendly interface and an SMTP alternative for email setup.",
      technologies: "Python, PyAutoGUI, Outlook."
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black flex items-center justify-center" id="projects">
      <div className="container px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-white">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Technologies used: {project.technologies}</p>
                <Button className="mt-4" variant="outline">
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}