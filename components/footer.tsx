"use client"

import { ThemeToggle } from "./ui/theme-toggle"
import { CuboidIcon as Cube, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-neutral-900 gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cube className="h-6 w-6 text-primary-500" />
              <span className="font-bold text-xl">DIJITIZE</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Transforming ideas into digital reality through innovative solutions and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-500">
                <Github size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-primary-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-neutral-400 hover:text-primary-500">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-neutral-400 hover:text-primary-500">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-primary-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  AI Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  Digital Innovation
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500">
                  Digital Transformation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-neutral-400">123 Tech Street, Digital City, 10010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-neutral-400">info@dijitize.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} Dijitize. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <a href="#" className="text-neutral-400 hover:text-primary-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-primary-500 text-sm">
              Terms of Service
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

