"use client";

import { ThemeToggle } from "./ui/theme-toggle";
import {
  CuboidIcon as Cube,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="gray-100 w-full bg-neutral-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="DIJITIZE" width={185} height={40} />
            </div>
            <p className="mb-6 text-neutral-400">
              Transforming ideas into digital reality through innovative
              solutions and cutting-edge technology.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 text-neutral-400">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 text-neutral-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 text-neutral-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 text-neutral-400">
                <Instagram size={20} />
              </a>
            </div> */}
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-500 text-neutral-400">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Marketing Videos
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary-500 text-neutral-400"
                >
                  Branding
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-primary-500 mt-1 flex-shrink-0"
                />
                <span className="text-neutral-400">
                  123 Tech Street, Digital City, 10010
                </span>
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

        <div className="mt-10 flex flex-col items-center justify-between border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Dijitize. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            {/* <a
              href="#"
              className="hover:text-primary-500 text-sm text-neutral-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-500 text-sm text-neutral-400"
            >
              Terms of Service
            </a> */}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
