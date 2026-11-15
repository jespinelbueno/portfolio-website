import { Mail, Github, Linkedin, ArrowRight, ArrowUpRight } from 'lucide-react'

export function Contact() {
  return (
    <section className="section-grid w-full border-t border-slate-700/60 bg-gradient-to-r from-slate-900 to-gray-800 py-16 text-white sm:py-24" id="contact">
      <div className="portfolio-container relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <p className="eyebrow mb-4">Let’s connect</p>
          <h2 className="section-title">Good work starts<br />with a conversation.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">Have a question about my work, or an idea to share? I’d love to hear from you.</p>
          <a className="action-link action-primary mt-7" href="mailto:juandiegoespinelbueno@gmail.com"><Mail aria-hidden="true" />Get in touch<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="divide-y divide-slate-700 border-y border-slate-700 md:self-center">
          <a className="group flex min-h-24 items-center gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300" href="https://github.com/jespinelbueno" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 shrink-0 text-gray-200" aria-hidden="true" />
            <span className="flex-1"><span className="block text-base font-medium">GitHub</span><span className="mt-1 block text-sm text-slate-400">Explore the code behind my projects</span></span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a className="group flex min-h-24 items-center gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300" href="https://www.linkedin.com/in/juan-espinel-bueno/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 shrink-0 text-gray-200" aria-hidden="true" />
            <span className="flex-1"><span className="block text-base font-medium">LinkedIn</span><span className="mt-1 block text-sm text-slate-400">Follow my professional journey</span></span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
