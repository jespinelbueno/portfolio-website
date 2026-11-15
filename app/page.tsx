import { Header } from '@/components/Header'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { EducationExperience } from '@/components/Education&Experience'

export default function Home() {
  return (
    <div className=" bg-black flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 min-w-0 flex flex-col">
        <About />
        <EducationExperience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}