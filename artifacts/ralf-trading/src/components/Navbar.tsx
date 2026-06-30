import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import logo from "@assets/Logo_1782745341412.webp";
import { MusicPlayer } from "./MusicPlayer";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Investment Solutions" },
  { href: "/funded-accounts", label: "Funded Accounts" },
  { href: "/performance", label: "Performance" },
  { href: "/education", label: "Education" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 border-b border-white/5 py-4 backdrop-blur-md">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-3 cursor-pointer">
              <img
                src={logo}
                alt="RALF Trading"
                className="h-9 md:h-11 w-auto"
              />
              <span className="hidden md:flex flex-col">
                <span className="text-primary font-serif text-lg leading-none tracking-[0.08em]">
                  RALF TRADING
                </span>
                <span className="text-white/45 text-[9px] uppercase tracking-[0.18em] font-sans leading-none mt-1.5">
                  Proprietary Trading & Capital Management
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-center">
                  <span
                    className={`text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer hover:text-primary ${
                      location === link.href ? "text-primary" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-white/20" />

            <MusicPlayer />

            <Link href="/auth">
              <span className="px-5 py-2 border border-primary/80 text-primary hover:bg-primary hover:text-black transition-colors text-xs uppercase tracking-[0.14em] cursor-pointer ml-4 flex items-center gap-2">
                Login / Register
              </span>
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-4">
            <MusicPlayer />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-primary"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-primary cursor-pointer"
                >
                  {link.label}
                </span>
              </Link>
            ))}

            <Link href="/auth">
              <span
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-8 py-3 border border-primary text-primary text-lg uppercase tracking-widest cursor-pointer"
              >
                Login / Register
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
