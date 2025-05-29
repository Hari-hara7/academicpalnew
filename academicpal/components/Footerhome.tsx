"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  ShieldCheck,
  FileText,
  Home,
  BookOpen,
  Users,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Logo and Description */}
          <div className="flex flex-col gap-2">
            <Image
              src="/academicpal.jpg"
              alt="Academic Pal Logo"
              width={90}
              height={50}
              className="mb-2"
            />
            <p className="text-gray-400 text-sm">
              Academic Pal — Empowering your academic journey with quality notes, resources, and support.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/home" className="hover:text-white flex items-center gap-1">
                  <Home className="w-4 h-4" /> Home
                </a>
              </li>
              <li>
                <a href="/notes" className="hover:text-white flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> Notes
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white flex items-center gap-1">
                  <Users className="w-4 h-4" /> About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy-policy" className="hover:text-white flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-white flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" /> academicplahari@gmail.com
            </p>
            <p className="flex items-center gap-2 text-gray-400 mt-1">
              <Phone className="w-4 h-4" /> +91 7989777877
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/Academic-pal" aria-label="GitHub" className="hover:text-gray-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/102724699/admin/dashboard/" aria-label="LinkedIn" className="hover:text-gray-400">
                <Linkedin className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6 bg-gray-700" />

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-xs">
          © 2025 Academic Pal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
