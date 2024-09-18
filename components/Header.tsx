import Link from 'next/link'

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-black to-gray-800 text-white ">
      <Link href="#" className="flex items-center justify-center">
        <span className="sr-only">Juan Espinel</span>
        <span className="font-bold text-xl">JE</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
          Projects
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
          Contact
        </Link>
      </nav>
    </header>
  )
}