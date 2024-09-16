import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of Project 1",
      technologies: "React, Node.js, MongoDB"
    },
    {
      title: "Project 2",
      description: "A brief description of Project 2",
      technologies: "Vue.js, Express, PostgreSQL"
    },
    {
      title: "Project 3",
      description: "A brief description of Project 3",
      technologies: "Next.js, GraphQL, Prisma"
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-600  flex items-center justify-center" id="projects">
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