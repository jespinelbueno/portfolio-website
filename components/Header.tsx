"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for open/close

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen]);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-gradient-to-r from-black to-gray-800 text-white relative z-50">
      {/* Logo */}
      <Link href="#" className="flex items-center">
        <span className="sr-only">Juan Espinel</span>
        <span className="font-bold text-xl">JE</span>
      </Link>

      {/* Desktop Navigation (Hidden on small screens) */}
      <nav className="ml-auto hidden max-[400px]:hidden sm:flex gap-4">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#education-experience">
          Education & Experience
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
          Projects
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
          Contact
        </Link>
      </nav>

      {/* Hamburger Menu Button (Visible on small screens) */}
      <button 
        className="sm:hidden max-[400px]:flex items-center justify-center p-2 z-50" 
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Full-Screen Mobile Navigation Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center text-white space-y-6 z-50"
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-6 text-white" 
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Menu Links */}
          <Link className="text-2xl font-medium hover:underline" href="#about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link className="text-2xl font-medium hover:underline" href="#education-experience" onClick={() => setIsOpen(false)}>
            Education & Experience
          </Link>
          <Link className="text-2xl font-medium hover:underline" href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link className="text-2xl font-medium hover:underline" href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </motion.div>
      )}
    </header>
  );
}
