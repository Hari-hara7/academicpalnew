"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { RiCodeLine } from "react-icons/ri";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white py-10">
      <div className="container mx-auto px-6 font-sans">
      
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
         
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl  text-yellow-400 font-bold font-poppins">
              Academic Pal
            </h1>
            <p className="mt-2 text-gray-400 text-center md:text-left font-light">
              Empowering students with curated resources for a brighter future.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <h2 className="text-yellow-400 font-semibold mb-2">Resources</h2>
              <ul>
                <li className="hover:text-yellow-300">
                  <a
                    href="https://opensource.org/licenses/MIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MIT License
                  </a>
                </li>
                <li className="hover:text-yellow-300">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-yellow-400 font-semibold mb-2">Connect</h2>
              <ul>
                <li className="hover:text-yellow-300">
                  <a href="mailto:nnm23cs256@nmamit.in">Contact Us</a>
                </li>
                <li className="hover:text-yellow-300">
                  <a
                    href="https://hariharanath.is-cod.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Developer Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm text-gray-400">
            <h2 className="text-yellow-400 font-semibold mb-2">Partner</h2>
            <ul>
              <li className="hover:text-yellow-300">
                <a
                  href="https://is-cod.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partner with IS-COD.IN
                </a>
              </li>
              <li className="hover:text-yellow-300">
                <a
                  href="https://register.is-cod.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Domain Services
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://github.com/Academic-pal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/company/academic-pal/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="mailto:nnm23cs256@nmamit.in"
              className="text-gray-300 hover:text-yellow-400 transition-all"
              aria-label="Email"
            >
              <FaEnvelope className="w-7 h-7" />
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left font-light">
            &copy; 2024 Academic Pal. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1 font-light">
            <RiCodeLine /> Designed and Developed by{" "}
            <a
              href="https://hariharanath.is-cod.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Hari Hara Nath
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
