import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-black text-slate-400">
      <div className="portfolio-container flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
        <p className="text-xs">© {new Date().getFullYear()} Juan Espinel. All rights reserved.</p>
        <Link className="action-link min-h-11 text-xs text-slate-400" href="#about">Back to top <ArrowUp aria-hidden="true" /></Link>
      </div>
    </footer>
  )
}
