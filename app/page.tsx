import { Header } from '@/components/Header'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className=" bg-black flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}