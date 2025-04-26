import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white/95 shadow-sm z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
          Portfolio
          </Link>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="font-medium hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#resume" className="font-medium hover:text-primary transition-colors">
              Resume
            </a>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-primary"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a 
              href="#about" 
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Projects
            </a>
            <a 
              href="#resume" 
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Resume
            </a>
            <a 
              href="#contact" 
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
