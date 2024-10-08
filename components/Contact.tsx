import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export function Contact() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center text-white bg-gradient-to-r from-slate-900 to-gray-800" id="contact">
      <div className="container px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Get in Touch</h2>
        <div className="flex justify-center space-x-4">
          <a href="mailto:juandiegoespinelbueno@gmail.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </a>
          <a href="https://github.com/jespinelbueno" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/juan-espinel-bueno/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
