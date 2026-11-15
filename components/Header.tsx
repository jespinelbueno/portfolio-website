"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

const links = [
  { href: "#about", label: "About" },
  { href: "#education-experience", label: "Education & Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    // Observe the layout width so an open menu also closes when the app's
    // embedded viewport changes without a native window resize.
    const observer = new ResizeObserver(() => {
      if (document.documentElement.clientWidth >= 768) setIsOpen(false);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/60 bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="portfolio-container flex h-20 items-center justify-between">
        <Link href="#" aria-label="Juan Espinel home" className="flex min-h-11 items-center font-semibold text-xl tracking-[-0.06em]">juan<span className="text-slate-400">espinel.</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={link.href === "#contact" ? "action-link action-primary" : "inline-flex min-h-11 items-center text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"}>{link.label}{link.href === "#contact" && <ArrowRight aria-hidden="true" />}</Link>
          ))}
        </nav>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button type="button" aria-label="Open navigation" className="inline-flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 md:hidden">
              <Menu size={24} aria-hidden="true" />
            </button>
          </DialogTrigger>
          <DialogContent onCloseAutoFocus={event => {
            if (!pendingSection.current) return;
            event.preventDefault();
            const section = document.querySelector<HTMLElement>(pendingSection.current);
            pendingSection.current = null;
            // Scroll after the dialog releases its focus trap and body scroll lock.
            if (section) {
              section.tabIndex = -1;
              section.focus({ preventScroll: true });
              section.scrollIntoView({ block: "start" });
            }
          }} aria-describedby={undefined} className="left-0 top-0 flex h-dvh max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col overflow-y-auto rounded-none border-0 bg-slate-950 p-6 text-white sm:rounded-none">
            <DialogTitle className="sr-only">Navigation</DialogTitle>
            <nav aria-label="Mobile navigation" className="my-auto flex flex-col items-center gap-3 py-12 text-center">
              {links.map(link => (
                <DialogClose key={link.href} asChild>
                  <Link href={link.href} onClick={() => { pendingSection.current = link.href; }} className="flex min-h-11 items-center justify-center rounded-lg px-4 text-xl font-medium hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 sm:text-2xl">{link.label}</Link>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
